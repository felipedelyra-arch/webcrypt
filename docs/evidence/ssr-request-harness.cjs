const { IncomingMessage, ServerResponse } = require('node:http');
const { Duplex } = require('node:stream');
const { once } = require('node:events');
const { writeFileSync } = require('node:fs');
const assert = require('node:assert/strict');
process.env.NODE_ENV = 'production';
process.env.SITE_PUBLISHED = 'false';
process.env.SITE_URL = 'http://localhost:3000';
process.env.CONTACT_ENABLED = 'false';
const next = require('next');
(async () => {
  const app = next({ dev: false, dir: process.cwd(), hostname: 'localhost', port: 3000 });
  await app.prepare();
  const cases = [
    ['/', 'GET', 200, 'hero-title'],
    ['/solucoes', 'GET', 200, 'Aplicativos'],
    ['/sobre', 'GET', 200, 'WebCrypt'],
    ['/seguranca', 'GET', 200, 'Segurança'],
    ['/blog', 'GET', 200, 'Novas perspectivas'],
    ['/projetos', 'GET', 200, 'Estudos de caso em preparação.'],
    ['/contato', 'GET', 200, 'Nenhuma informação será enviada'],
    ['/privacidade', 'GET', 200, 'Privacidade'],
    ['/blog/pwa-ou-aplicativo-nativo', 'GET', 404],
    ['/blog/seguranca-desde-a-arquitetura', 'GET', 404],
    ['/blog/da-necessidade-a-entrega-de-uma-plataforma', 'GET', 404],
    ['/projetos/mercadog', 'GET', 404],
    ['/projetos/tio-panda', 'GET', 404],
    ['/pagina-inexistente', 'GET', 404],
    ['/api/contato', 'POST', 503],
    ['/api/contato', 'GET', 405],
    ['/robots.txt', 'GET', 200, 'Disallow: /'],
    ['/sitemap.xml', 'GET', 200, '<urlset'],
  ];
  for (const [url, method, status, marker] of cases) {
    const chunks = [];
    // In-process HTTP streams check the built routes without binding a port.
    const socket = new Duplex({ read() {}, write(chunk, _encoding, done) { chunks.push(Buffer.from(chunk)); done(); } });
    socket.remoteAddress = '127.0.0.1';
    const req = new IncomingMessage(socket);
    req.method = method; req.url = url;
    req.headers = { host: 'localhost:3000', accept: 'text/html' }; req.push(null);
    const res = new ServerResponse(req); res.assignSocket(socket);
    const finished = once(res, 'finish');
    await app.getRequestHandler()(req, res);
    await finished;
    const raw = Buffer.concat(chunks);
    const split = raw.indexOf('\r\n\r\n');
    assert.ok(split >= 0);
    let body = raw.subarray(split + 4);
    if (/transfer-encoding: chunked/i.test(raw.subarray(0, split).toString('ascii'))) {
      let cursor = 0; const decoded = [];
      while (true) {
        const end = body.indexOf('\r\n', cursor);
        assert.ok(end >= 0);
        const size = parseInt(body.subarray(cursor, end).toString('ascii'), 16);
        assert.ok(Number.isFinite(size) && size >= 0);
        if (!size) break;
        const limit = end + 2 + size;
        assert.ok(limit + 2 <= body.length);
        decoded.push(body.subarray(end + 2, limit));
        cursor = limit + 2;
      }
      body = Buffer.concat(decoded);
    }
    const html = body.toString('utf8');
    assert.equal(res.statusCode, status, url);
    if (marker) assert.ok(html.includes(marker), url + ' missing expected content');
    assert.equal(res.getHeader('x-robots-tag'), 'noindex, nofollow', url);
    const htmlPage = String(res.getHeader('content-type')).includes('text/html');
    if (htmlPage) assert.ok(String(res.getHeader('content-security-policy')).includes("frame-ancestors 'none'"), url + ' missing CSP');
    if (url === '/' || url === '/projetos') {
      assert.ok(!html.includes('Mercadog') && !html.includes('Tio Panda'), url + ' exposes draft projects');
    }
    if (url === '/') {
      assert.ok(html.includes('architecture-scene'));
      assert.ok(!html.includes('core-symbol') && !html.includes('security-watermark'));
    }
    if (url === '/sitemap.xml') assert.ok(!html.includes('<loc>'));
    if (url === '/api/contato' && method === 'POST') assert.equal(JSON.parse(html).received, undefined);
    console.log(JSON.stringify({ url, method, status: res.statusCode, noindex: true, csp: Boolean(res.getHeader('content-security-policy')), bytes: body.length }));
    if (url === '/') writeFileSync('/tmp/webcrypt-home-ssr.html', html);
    if (url === '/contato') writeFileSync('/tmp/webcrypt-contact-ssr.html', html);
    socket.destroy();
  }
  await app.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
