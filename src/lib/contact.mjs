import { DatabaseSync } from 'node:sqlite';
import { openSync, closeSync, lstatSync } from 'node:fs';
import { createCipheriv, createDecipheriv, createHmac, randomBytes, randomUUID } from 'node:crypto';

const MAX_BYTES = 24576;
const DAY = 86400000;
const reply = (status, body, extra = {}) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', ...extra } });
const unavailable = () => reply(503, { error: 'O formulário está temporariamente indisponível.' });
const hash = (config, value) => createHmac('sha256', config.rateKey).update(value).digest('hex');

function database(config) {
  try { closeSync(openSync(config.path, 'wx', 0o600)); }
  catch (error) { if (error.code !== 'EEXIST') throw error; }
  const file = lstatSync(config.path);
  if (!file.isFile() || file.isSymbolicLink() || (file.mode & 0o077) !== 0) throw new Error('Private file required');
  const db = new DatabaseSync(config.path);
  db.exec(`PRAGMA busy_timeout=2000; PRAGMA synchronous=FULL; PRAGMA secure_delete=ON;
    CREATE TABLE IF NOT EXISTS contacts (
      id TEXT PRIMARY KEY, request_key TEXT UNIQUE NOT NULL, payload_hash TEXT NOT NULL,
      key_id TEXT NOT NULL, nonce BLOB NOT NULL, ciphertext BLOB NOT NULL, tag BLOB NOT NULL,
      created_at INTEGER NOT NULL, notified INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS rate_limits (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL);`);
  return db;
}

async function readPayload(request) {
  if (Number(request.headers.get('content-length')) > MAX_BYTES) throw new RangeError('body');
  const reader = request.body?.getReader();
  if (!reader) throw new SyntaxError('body');
  let timeout;
  try {
    return await Promise.race([
      (async () => {
        const chunks = []; let bytes = 0;
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > MAX_BYTES) throw new RangeError('body');
          chunks.push(value);
        }
        return JSON.parse(Buffer.concat(chunks).toString('utf8'));
      })(),
      new Promise((_, reject) => { timeout = setTimeout(() => reject(new RangeError('timeout')), 5000); }),
    ]);
  } finally { clearTimeout(timeout); void reader.cancel().catch(() => {}); }
}

function validate(data) {
  const fields = {};
  const limits = { name: [2,100], contact: [5,180], company: [0,120], service: [1,30], message: [20,5000], website: [0,0] };
  if (!data || typeof data !== 'object' || Array.isArray(data) || Object.keys(data).some(k => !Object.hasOwn(limits, k))) return { fields: { message: 'Revise os campos enviados.' } };
  const values = {};
  for (const [key, [min, max]] of Object.entries(limits)) {
    const value = data[key] ?? (key === 'company' || key === 'website' ? '' : null);
    if (typeof value !== 'string') { fields[key] = 'Informe um texto válido.'; continue; }
    values[key] = value.trim();
    if (value.length > max || values[key].length < min || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/u.test(value)) fields[key] = `Use entre ${min} e ${max} caracteres.`;
  }
  const contact = values.contact || '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !(/^\+?[\d\s().-]+$/.test(contact) && (contact.match(/\d/g)?.length || 0) >= 5)) fields.contact = 'Informe um e-mail ou telefone válido.';
  if (!['apps','plataformas','integracoes','seguranca','a-definir'].includes(values.service)) fields.service = 'Selecione uma solução.';
  return { fields, values };
}

export async function handleContact(request, config) {
  if (!config) return unavailable();
  if (request.method !== 'POST') return reply(405, { error: 'Método não permitido.' }, { Allow: 'POST' });
  if (request.headers.get('origin') !== config.origin) return reply(403, { error: 'Origem não permitida.' });
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) return reply(415, { error: 'Formato não aceito.' });
  const requestKey = request.headers.get('idempotency-key') || '';
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestKey)) return reply(422, { error: 'Recarregue a página antes de enviar.' });
  let data;
  try { data = await readPayload(request); }
  catch (error) { return reply(error instanceof RangeError ? 413 : 422, { error: 'O conteúdo enviado é inválido ou excede o limite.' }); }
  let db;
  try {
    db = database(config);
    const now = Date.now();
    const identity = config.trustProxy ? request.headers.get('x-real-ip') : 'local';
    if (!identity || identity.length > 64) return unavailable();
    const { fields, values } = validate(data);
    if (values) delete values.website;
    const payload = JSON.stringify(values || {});
    const payloadHash = hash(config, payload);
    const storedKey = hash(config, requestKey);
    const prior = db.prepare('SELECT id,payload_hash,created_at FROM contacts WHERE request_key = ?').get(storedKey);
    if (prior && !Object.keys(fields).length && prior.created_at >= now - 90 * DAY) return prior.payload_hash === payloadHash ? reply(200, { id: prior.id, received: true }) : reply(409, { error: 'O conteúdo mudou. Inicie um novo envio.' });
    db.exec('BEGIN IMMEDIATE');
    db.prepare('DELETE FROM contacts WHERE created_at < ?').run(now - 90 * DAY);
    db.prepare('DELETE FROM rate_limits WHERE expires < ?').run(now);
    let limited = false;
    for (const [bucket, max] of [[hash(config, identity), 10], ['global', 100]]) {
      const row = db.prepare('SELECT count FROM rate_limits WHERE bucket = ?').get(bucket);
      if (row && row.count >= max) { limited = true; break; }
      db.prepare('INSERT INTO rate_limits(bucket,count,expires) VALUES (?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1').run(bucket, now + 3600000);
    }
    db.exec('COMMIT');
    if (limited) return reply(429, { error: 'Aguarde antes de tentar novamente.' }, { 'Retry-After': '3600' });
    if (Object.keys(fields).length) return reply(422, { error: 'Revise os campos indicados.', fields });
    const id = randomUUID();
    const nonce = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', config.key, nonce);
    cipher.setAAD(Buffer.from(`${id}:${config.keyId}`));
    const ciphertext = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);
    db.prepare('INSERT INTO contacts(id,request_key,payload_hash,key_id,nonce,ciphertext,tag,created_at) VALUES (?,?,?,?,?,?,?,?)').run(id, storedKey, payloadHash, config.keyId, nonce, ciphertext, cipher.getAuthTag(), now);
    return reply(201, { id, received: true });
  } catch { return unavailable(); }
  finally { if (db) { try { db.exec('ROLLBACK'); } catch {} db.close(); } }
}

// Notifications are an outbox: failure never changes the saved request or its receipt.
export async function flushNotifications(config, url, token, send = fetch) {
  if (!url?.startsWith('https://') || !token) throw new Error('HTTPS notification endpoint and token required');
  const db = database(config);
  let sent = 0;
  try {
    const cutoff = Date.now() - 90 * DAY;
    for (const { id } of db.prepare('SELECT id FROM contacts WHERE notified = 0 AND created_at >= ? ORDER BY created_at LIMIT 50').all(cutoff)) {
      try {
        const response = await send(url, { method: 'POST', redirect: 'error', signal: AbortSignal.timeout(5000), headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, 'Idempotency-Key': id }, body: JSON.stringify({ id }) });
        await response.body?.cancel();
        if (!response.ok) continue;
        db.prepare('UPDATE contacts SET notified=1 WHERE id=?').run(id); sent++;
      } catch { /* A later run retries pending notifications. */ }
    }
    return { sent, pending: db.prepare('SELECT count(*) AS count FROM contacts WHERE notified=0 AND created_at >= ?').get(cutoff).count };
  } finally { db.close(); }
}

export function readContact(config, id, keyForId) {
  const db = database(config);
  try {
    const row = db.prepare('SELECT * FROM contacts WHERE id=? AND created_at >= ?').get(id, Date.now() - 90 * DAY);
    if (!row) return null;
    const decipher = createDecipheriv('aes-256-gcm', keyForId(row.key_id), row.nonce);
    decipher.setAAD(Buffer.from(`${row.id}:${row.key_id}`));
    decipher.setAuthTag(row.tag);
    return JSON.parse(Buffer.concat([decipher.update(row.ciphertext), decipher.final()]).toString('utf8'));
  } finally { db.close(); }
}

export function maintainContacts(config, deleteId) {
  const db = database(config);
  try {
    const deleted = deleteId ? db.prepare('DELETE FROM contacts WHERE id=?').run(deleteId).changes : db.prepare('DELETE FROM contacts WHERE created_at < ?').run(Date.now() - 90 * DAY).changes;
    db.prepare('DELETE FROM rate_limits WHERE expires < ?').run(Date.now());
    return { deleted, pending: db.prepare('SELECT id,created_at FROM contacts WHERE notified=0 ORDER BY created_at LIMIT 50').all() };
  } finally { db.close(); }
}
