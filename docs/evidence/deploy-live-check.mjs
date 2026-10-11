import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
const base = 'https://webcrypt.vercel.app';
const checks = [];
for (const path of ['/', '/solucoes', '/sobre', '/projetos', '/seguranca', '/blog', '/contato', '/privacidade', '/robots.txt', '/sitemap.xml', '/opengraph-image', '/brand/webcrypt-logo-original.jpg', '/brand/webcrypt-symbol-original.jpg', '/projetos/mercadog', '/projetos/tio-panda']) {
  const response = await fetch(base + path);
  const expected = path.startsWith('/projetos/') ? 404 : 200;
  assert.equal(response.status, expected, path);
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('text/html')) {
    const body = await response.text();
    assert.ok(!body.includes('Ops.'), path + ' must not render error page');
    assert.match(response.headers.get('x-robots-tag'), /noindex/);
    if (path === '/') {
      assert.match(body, /Software que faz/);
      assert.match(body, /hero-story/);
      assert.ok(!body.includes('localhost:3000'));
      assert.ok(!body.includes('Mercadog'));
      for (const asset of new Set([...body.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+)[^"]*"/g)].map(match => match[1]))) {
        const result = await fetch(base + asset);
        assert.equal(result.status, 200, asset);
        checks.push({ path: asset, status: result.status });
      }
    }
  } else if (path === '/robots.txt') {
    assert.match(await response.text(), /Disallow: \//);
  } else if (path === '/sitemap.xml') {
    assert.ok(!(await response.text()).includes('<loc>'));
  } else if (path === '/opengraph-image') {
    assert.match(contentType, /image\/png/);
  }
  checks.push({ path, status: response.status });
}
const contact = await fetch(base + '/api/contato', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: base }, body: '{}' });
assert.equal(contact.status, 503);
checks.push({ path: '/api/contato', method: 'POST', status: contact.status });
writeFileSync('docs/evidence/deploy-live-2026-10-11.json', JSON.stringify({ base, checkedAt: new Date().toISOString(), checks }, null, 2));
console.log(`${checks.length} verificações online aprovadas: páginas, assets, rascunhos, noindex, OG e contato desativado.`);
