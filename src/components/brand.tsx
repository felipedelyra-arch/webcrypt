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
