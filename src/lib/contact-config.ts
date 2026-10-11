import { isAbsolute, dirname, relative, resolve, sep } from 'node:path';
import { lstatSync, realpathSync } from 'node:fs';

export function contactConfig() {
  const env = process.env;
  if (env.CONTACT_ENABLED !== 'true' || env.VERCEL || (env.NODE_ENV === 'production' && env.CONTACT_TRUST_PROXY !== 'true')) return null;
  const path = env.CONTACT_DB_PATH || '';
  const keyId = env.CONTACT_KEY_ID || 'v1';
  const key = env[`CONTACT_KEY_${keyId.toUpperCase()}`] || '';
  const rateKey = env.CONTACT_RATE_KEY || '';
  if (!isAbsolute(path) || !/^v[1-9][0-9]*$/.test(keyId) || !/^[A-Za-z0-9+/]{43}=$/.test(key) || !/^[A-Za-z0-9+/]{43}=$/.test(rateKey)) return null;
  try {
    const directory = realpathSync(dirname(path));
    if (directory !== resolve(dirname(path))) return null;
    const parent = lstatSync(directory);
    if (!parent.isDirectory() || (parent.mode & 0o077) !== 0 || parent.uid !== process.getuid?.()) return null;
    const relation = relative(realpathSync(process.cwd()), directory);
    if (relation !== '..' && !relation.startsWith(`..${sep}`)) return null;
    try { const file = lstatSync(path); if (!file.isFile() || file.isSymbolicLink() || file.uid !== process.getuid?.() || (file.mode & 0o077) !== 0) return null; }
    catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') return null; }
    const origin = new URL(env.SITE_URL || 'http://localhost:3000').origin;
    if (!origin.startsWith('https://') && (env.NODE_ENV === 'production' || !['localhost','127.0.0.1'].includes(new URL(origin).hostname))) return null;
    return { path, keyId, key: Buffer.from(key, 'base64'), rateKey: Buffer.from(rateKey, 'base64'), origin, trustProxy: env.CONTACT_TRUST_PROXY === 'true' };
  } catch { return null; }
}
export function contactAvailable() { return contactConfig() !== null; }
