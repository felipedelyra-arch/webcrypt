const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const assert = require('node:assert/strict');
const { webpack } = require('next/dist/compiled/webpack/webpack');
const root = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'webcrypt-motion-'));
const assets = Object.fromEntries(['webcrypt-symbol-original.jpg', 'webcrypt-logo-original.jpg'].map(name => [`/brand/${name}`, `data:image/jpeg;base64,${fs.readFileSync(path.join(root, 'public/brand', name)).toString('base64')}`]));
// shortcut: native image/link adapters isolate React motion; use the live Next server to test navigation and hydration.
fs.writeFileSync(path.join(temp, 'image.jsx'), `import React from 'react';const assets=${JSON.stringify(assets)};export default function Image({unoptimized,priority,fill,...props}){return <img {...props} src={assets[props.src]||props.src}/>;}`);
fs.writeFileSync(path.join(temp, 'navigation.js'), "export const usePathname=()=>'/';");
fs.writeFileSync(path.join(temp, 'link.jsx'), "import React from 'react';export default function Link({prefetch,replace,scroll,...props}){return <a {...props}/>;}");
fs.writeFileSync(path.join(temp, 'loader.cjs'), `const ts=require(${JSON.stringify(require.resolve('typescript'))});module.exports=function(source){return ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX}}).outputText;};`);
fs.writeFileSync(path.join(temp, 'entry.jsx'), `import React from 'react';import {createRoot} from 'react-dom/client';import Home from ${JSON.stringify(path.join(root, 'src/app/page.tsx'))};import {Header} from ${JSON.stringify(path.join(root, 'src/components/header.tsx'))};createRoot(document.getElementById('motion-root')).render(<React.StrictMode><Header/><Home/></React.StrictMode>);`);
webpack({ mode: 'production', optimization: { minimize: false }, entry: path.join(temp, 'entry.jsx'), output: { path: temp, filename: 'motion.js' }, resolve: { extensions: ['.tsx', '.ts', '.jsx', '.js'], modules: [path.join(root, 'node_modules')], alias: { '@': path.join(root, 'src'), 'next/image': path.join(temp, 'image.jsx'), 'next/link': path.join(temp, 'link.jsx'), 'next/navigation': path.join(temp, 'navigation.js') } }, module: { rules: [{ test: /\.[jt]sx?$/, exclude: /node_modules/, use: path.join(temp, 'loader.cjs') }] }, plugins: [new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production'), 'process.env.SITE_PUBLISHED': JSON.stringify('false'), 'process.env.SHOW_DRAFTS': JSON.stringify('false'), 'process.env.SITE_URL': JSON.stringify('http://localhost:3000') })] }, (error, stats) => {
  try {
    assert.ifError(error);
    assert.ok(!stats.hasErrors(), stats.toString({ all: false, errors: true }));
    const layout = fs.readFileSync(path.join(root, 'docs/evidence/home-offline.html'), 'utf8');
    const styles = [...layout.matchAll(/<style>[\s\S]*?<\/style>/g)].map(match => match[0]).join('');
    assert.ok(styles.includes('orbit-signals'));
    assert.ok(styles.includes('intro-replay') && styles.includes('selection-copy-in'), 'Regenerate SSR and home-offline.html from the current build first');
    const script = fs.readFileSync(path.join(temp, 'motion.js'), 'utf8').replace(/<\/script/gi, '<\\/script');
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WebCrypt: ensaio das animações React</title>${styles}<style>body{--font-sora:${(styles.match(/--font-sora:([^;}]+)/) || [])[1] || 'Arial'}}</style></head><body><div id="motion-root"></div><script>${script}</script></body></html>`;
    assert.ok(html.includes('motion-root') && script.length > 10000);
    fs.writeFileSync(path.join(root, 'docs/evidence/motion-lab.html'), html);
    console.log('motion-lab.html: componentes React reais; adapters locais de imagem/link; sem servidor Next.');
  } catch (failure) { console.error(failure); process.exitCode = 1; }
  finally { fs.rmSync(temp, { recursive: true, force: true }); }
});
