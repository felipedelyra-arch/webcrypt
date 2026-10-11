import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomBytes, randomUUID } from 'node:crypto';
import { DatabaseSync } from 'node:sqlite';
import { handleContact, readContact, flushNotifications, maintainContacts } from '../src/lib/contact.mjs';

test('contato não configurado nunca simula recebimento', async () => {
  const response = await handleContact(new Request('http://localhost/api/contato', { method: 'POST' }), null);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).received, undefined);
});

const valid = { name: 'Pessoa de teste', contact: 'teste@example.com', company: '', service: 'apps', message: 'Quero um portal para um projeto sintético.', website: '' };
const request = (data = valid, key = randomUUID(), origin = 'http://localhost') => new Request('http://localhost/api/contato', { method: 'POST', headers: { 'content-type': 'application/json', origin, 'idempotency-key': key }, body: JSON.stringify(data) });
function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), 'webcrypt-test-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  return { path: join(directory, 'contact.db'), keyId: 'v1', key: randomBytes(32), rateKey: randomBytes(32), origin: 'http://localhost', trustProxy: false };
}
test('confirma somente após persistir e reenvio não duplica', async t => {
  const config = fixture(t), key = randomUUID();
  const first = await handleContact(request(valid, key), config);
  assert.equal(first.status, 201);
  const receipt = await first.json();
  assert.equal(receipt.received, true);
  assert.match(receipt.id, /^[0-9a-f-]{36}$/);
  assert.equal(readFileSync(config.path).includes(Buffer.from(valid.message)), false);
  const repeated = await handleContact(request(valid, key), config);
  assert.equal(repeated.status, 200);
  assert.deepEqual(await repeated.json(), receipt);
  assert.equal((await handleContact(request({ ...valid, message: 'Outro projeto diferente do anterior.' }, key), config)).status, 409);
});

test('validação rejeita campos inesperados, serviços inválidos e spam', async t => {
  const config = fixture(t);
  for (const data of [{ ...valid, name: 'A' }, { ...valid, contact: 'inválido' }, { ...valid, service: 'admin' }, { ...valid, website: 'bot' }, { ...valid, role: 'owner' }, { ...valid, constructor: 'injetado' }]) {
    assert.equal((await handleContact(request(data), config)).status, 422);
  }
  assert.deepEqual(maintainContacts(config).pending, []);
});
test('origem indevida, formato e payload excessivo são recusados', async t => {
  const config = fixture(t);
  assert.equal((await handleContact(request(valid, randomUUID(), 'https://evil.example'), config)).status, 403);
  assert.equal((await handleContact(new Request('http://localhost/api/contato', { method: 'POST', headers: { origin: config.origin, 'content-type': 'text/plain' } }), config)).status, 415);
  assert.equal((await handleContact(request({ ...valid, message: 'x'.repeat(25000) }), config)).status, 413);
});
test('limite persistente retorna 429 inclusive após nova conexão', async t => {
  const config = fixture(t);
  for (let i = 0; i < 10; i++) assert.equal((await handleContact(request(), config)).status, 201);
  const response = await handleContact(request(), { ...config });
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('retry-after'), '3600');
});
test('SQL e HTML são armazenados como texto e conteúdo cifrado adulterado é recusado', async t => {
  const config = fixture(t);
  const data = { ...valid, name: "Ana'); DROP TABLE contacts;--", message: '<script>alert("synthetic")</script> Projeto de teste.' };
  const response = await handleContact(request(data), config);
  assert.equal(response.status, 201);
  const { id } = await response.json();
  const expected = { ...data }; delete expected.website;
  assert.deepEqual(readContact(config, id, () => config.key), expected);
  assert.throws(() => readContact(config, id, () => randomBytes(32)));
  assert.equal(readContact(config, randomUUID(), () => config.key), null);
  const db = new DatabaseSync(config.path);
  db.prepare('UPDATE contacts SET tag = ? WHERE id=?').run(randomBytes(16), id); db.close();
  assert.throws(() => readContact(config, id, () => config.key));
});
test('falha de notificação preserva solicitação e retry envia somente o identificador', async t => {
  const config = fixture(t);
  const { id } = await (await handleContact(request(), config)).json();
  const failed = await flushNotifications(config, 'https://notify.example', 'synthetic', async () => { throw new Error('provider offline'); });
  assert.deepEqual(failed, { sent: 0, pending: 1 });
  assert.equal(readContact(config, id, () => config.key).message, valid.message);
  const success = await flushNotifications(config, 'https://notify.example', 'synthetic', async (_url, options) => {
    assert.deepEqual(JSON.parse(options.body), { id });
    assert.equal(options.headers['Idempotency-Key'], id);
    return new Response(null, { status: 204 });
  });
  assert.deepEqual(success, { sent: 1, pending: 0 });
});
test('falha de armazenamento não confirma envio; exclusão remove acesso ao conteúdo', async t => {
  const config = fixture(t);
  assert.equal((await handleContact(request(), { ...config, path: join(config.path, 'missing', 'db') })).status, 503);
  const { id } = await (await handleContact(request(), config)).json();
  assert.equal(maintainContacts(config, id).deleted, 1);
  assert.equal(readContact(config, id, () => config.key), null);
});

test('erro HTTP do provedor libera a resposta e mantém a notificação pendente', async t => {
  const config = fixture(t);
  const { id } = await (await handleContact(request(), config)).json();
  let cancelled = false;
  const result = await flushNotifications(config, 'https://notify.example', 'synthetic', async () =>
    new Response(new ReadableStream({ cancel() { cancelled = true; } }), { status: 503 }),
  );
  assert.equal(cancelled, true);
  assert.deepEqual(result, { sent: 0, pending: 1 });
  assert.equal(readContact(config, id, () => config.key).message, valid.message);
});

test('recibo de envio já persistido pode ser recuperado após atingir limite', async t => {
  const config = fixture(t), key = randomUUID();
  const first = await (await handleContact(request(valid, key), config)).json();
  for (let i = 0; i < 9; i++) assert.equal((await handleContact(request(), config)).status, 201);
  assert.equal((await handleContact(request(), config)).status, 429);
  const retry = await handleContact(request(valid, key), config);
  assert.equal(retry.status, 200);
  assert.deepEqual(await retry.json(), first);
});

test('contato expirado não é lido nem notificado antes da limpeza agendada', async t => {
  const config = fixture(t);
  const { id } = await (await handleContact(request(), config)).json();
  const later = Date.now() + 91 * 86400000;
  t.mock.method(Date, 'now', () => later);
  assert.equal(readContact(config, id, () => config.key), null);
  let notifications = 0;
  const result = await flushNotifications(config, 'https://notify.example', 'synthetic', async () => {
    notifications++;
    return new Response(null, { status: 204 });
  });
  assert.equal(notifications, 0);
  assert.deepEqual(result, { sent: 0, pending: 0 });
  assert.equal(maintainContacts(config).deleted, 1);
});
