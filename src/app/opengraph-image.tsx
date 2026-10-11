import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'WebCrypt. Software que faz seu negócio avançar. Segurança desde a arquitetura.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const [logo, symbol, font] = await Promise.all([
  readFile(join(process.cwd(), 'public/brand/webcrypt-logo-original.jpg'), 'base64'),
  readFile(join(process.cwd(), 'public/brand/webcrypt-symbol-original.jpg'), 'base64'),
  readFile(join(process.cwd(), 'public/fonts/sora-regular.ttf')),
]);

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#080a08', color: '#f3f5f0', fontFamily: 'Sora', padding: 64, position: 'relative' }}>
      <div style={{ display: 'flex', position: 'absolute', width: 480, height: 480, right: -5, top: 84 }}>
        {/* ImageResponse renders native image elements. */}
        <img src={`data:image/jpeg;base64,${symbol}`} width={480} height={480} alt="" />
      </div>
      <div style={{ display: 'flex', position: 'relative', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%' }}>
        <div style={{ display: 'flex', width: 285, height: 88, position: 'relative', overflow: 'hidden' }}>
          <img src={`data:image/jpeg;base64,${logo}`} width={455} height={255} alt="" style={{ position: 'absolute', left: -92, top: -86 }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 65, lineHeight: 1.12, letterSpacing: -4, marginTop: 20 }}>
          <span>Software que faz</span>
          <span>seu negócio</span>
          <span>avançar.</span>
        </div>
        <div style={{ display: 'flex', fontSize: 22, color: '#b5f52b', marginTop: 30 }}>Segurança desde a arquitetura.</div>
      </div>
    </div>,
    { ...size, fonts: [{ name: 'Sora', data: font, style: 'normal', weight: 400 }] },
  );
}
