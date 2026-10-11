const { readFileSync, writeFileSync } = require('node:fs');
const { join, extname } = require('node:path');
const assert = require('node:assert/strict');
const root = process.cwd();
const data = path => {
  const type = { '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2' }[extname(path)];
  assert.ok(type, path);
  return `data:${type};base64,${readFileSync(path).toString('base64')}`;
};
let html = readFileSync('/tmp/webcrypt-home-ssr.html', 'utf8');
html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
html = html.replace(/<link\b[^>]*href="([^"?]+\.css)(?:\?[^"]*)?"[^>]*>/g, (_, href) => {
  assert.ok(href.startsWith('/_next/static/'));
  let css = readFileSync(join(root, '.next', href.slice('/_next/'.length)), 'utf8');
  css = css.replace(/url\((?:"|')?([^)'"\s]+)(?:"|')?\)/g, (whole, url) => {
    if (!url.includes('/media/')) return whole;
    const name = url.split('/').pop();
    return `url("${data(join(root, '.next/static/media', name))}")`;
  });
  return `<style>${css}</style>`;
});
html = html.replace(/src="(\/brand\/[^"]+)"/g, (_, src) => `src="${data(join(root, 'public', src))}"`);
html = html.replace(/<link\b[^>]*>/g, '');
assert.ok(html.includes('<style>'));
assert.ok(!/<script\b/.test(html));
writeFileSync(join(root, 'docs/evidence/home-offline.html'), html);
console.log(JSON.stringify({ output: 'docs/evidence/home-offline.html', bytes: Buffer.byteLength(html), mode: 'SSR production, scripts removed, assets embedded; layout only' }));
