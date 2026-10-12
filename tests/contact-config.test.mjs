import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { randomBytes } from 'node:crypto';
import { contactConfig, adminConfig } from '../src/lib/contact-config.ts';

test('contato exige diretório privado externo e configuração segura de produção', t => {
  const external = mkdtempSync(join(tmpdir(), 'webcrypt-private-'));
  const internal = mkdtempSync(join(process.cwd(), '..contact-test-'));
  const link = join(internal, 'external');
  symlinkSync(external, link);
  const settings = {
    CONTACT_ENABLED: 'true', CONTACT_DB_PATH: join(external, 'contacts.db'),
    CONTACT_KEY_ID: 'v1', CONTACT_KEY_V1: randomBytes(32).toString('base64'),
    CONTACT_RATE_KEY: randomBytes(32).toString('base64'), CONTACT_TRUST_PROXY: 'false',
    SITE_URL: 'http://localhost:3000', NODE_ENV: 'test', VERCEL: '',
  };
  const previous = Object.fromEntries(Object.keys(settings).map(key => [key, process.env[key]]));
  Object.assign(process.env, settings);
  t.after(() => {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key]; else process.env[key] = value;
    }
    rmSync(internal, { recursive: true, force: true });
    rmSync(external, { recursive: true, force: true });
  });
  assert.equal(Boolean(contactConfig()), true);
  process.env.CONTACT_DB_PATH = join(internal, 'contacts.db');
  assert.equal(Boolean(contactConfig()), false, 'nome iniciado por .. ainda fica dentro do site');
  process.env.CONTACT_DB_PATH = join(link, 'contacts.db');
  assert.equal(Boolean(contactConfig()), false, 'link dentro do site não pode expor banco externo');
  process.env.CONTACT_DB_PATH = settings.CONTACT_DB_PATH;
  process.env.NODE_ENV = 'production';
  process.env.SITE_URL = 'https://webcrypt.example';
  assert.equal(contactConfig(), null, 'produção exige proxy confiável');
  process.env.CONTACT_TRUST_PROXY = 'true';
  process.env.SITE_URL = 'http://localhost:3000';
  assert.equal(contactConfig(), null, 'produção exige HTTPS mesmo no localhost');
  process.env.SITE_URL = 'https://webcrypt.example';
  assert.equal(Boolean(contactConfig()), true);
  process.env.VERCEL = '1';
  assert.equal(contactConfig(), null, 'Vercel não pode ativar armazenamento em disco local');
});

test('chaves iguais são recusadas e o operador acessa com o recebimento desligado', t => {
  const external = mkdtempSync(join(tmpdir(), 'webcrypt-admin-'));
  const key = randomBytes(32).toString('base64');
  const settings = { CONTACT_ENABLED: 'false', CONTACT_DB_PATH: join(external, 'contacts.db'), CONTACT_KEY_ID: 'v1', CONTACT_KEY_V1: key, CONTACT_RATE_KEY: randomBytes(32).toString('base64'), VERCEL: '' };
  const previous = Object.fromEntries(Object.keys(settings).map(k => [k, process.env[k]]));
  Object.assign(process.env, settings);
  t.after(() => { for (const [k, v] of Object.entries(previous)) { if (v === undefined) delete process.env[k]; else process.env[k] = v; } rmSync(external, { recursive: true, force: true }); });
  assert.equal(contactConfig(), null);
  assert.ok(adminConfig());
  process.env.CONTACT_RATE_KEY = key;
  assert.equal(adminConfig(), null);
});
