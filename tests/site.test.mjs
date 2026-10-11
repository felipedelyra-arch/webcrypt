import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

test('site URL follows explicit configuration, Vercel preview, then localhost', () => {
  for (const [site, vercel, expected] of [
    ['https://webcrypt.example', 'preview.vercel.app', 'https://webcrypt.example'],
    ['', 'preview.vercel.app', 'https://preview.vercel.app'],
    ['', '', 'http://localhost:3000'],
  ]) {
    const actual = execFileSync(process.execPath, ['--experimental-strip-types', '--input-type=module', '-e', "import {siteUrl, isPublished} from './src/lib/site.ts'; console.log(JSON.stringify({siteUrl, isPublished}));"], {
      env: { ...process.env, SITE_URL: site, VERCEL_URL: vercel, SITE_PUBLISHED: 'false' },
      encoding: 'utf8',
    });
    assert.deepEqual(JSON.parse(actual), { siteUrl: expected, isPublished: false });
  }
});
