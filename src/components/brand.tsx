import Image from 'next/image';

export function Symbol({ className = '', priority = false }: { className?: string; priority?: boolean }) {
  return <Image
    className={`brand-symbol ${className}`}
    src="/brand/webcrypt-symbol-original.jpg"
    width={1024}
    height={1024}
    alt=""
    aria-hidden="true"
    unoptimized
    loading={priority ? 'eager' : 'lazy'}
  />;
}

export function Brand() {
  return <span className="brand">
    <Image src="/brand/webcrypt-logo-original.jpg" width={992} height={555} alt="WebCrypt, Soluções Tecnológicas" unoptimized />
  </span>;
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
