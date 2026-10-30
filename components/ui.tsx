import { ArrowUpRight, Code2 } from 'lucide-react';
import type { ReactNode } from 'react';
export function Logo() {
  return (
    <a href="#hjem" className="logo" aria-label="NordicWebz – til toppen">
      <span className="logo-icon">
        <Code2 size={23} />
      </span>
      Nordic<span>Webz</span>
      <span className="logo-dot">.</span>
    </a>
  );
}
export function OfferLink({
  children = 'Få et uforpliktende tilbud',
  secondary = false,
  className = '',
}: {
  children?: ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`button ${secondary ? 'button-secondary' : 'button-primary'} ${className}`}
      href="#kontakt"
    >
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function SectionTitle({
  label,
  title,
  children,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">
        <span />
        {label}
      </span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}
export function BrowserBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className={`browser-bar ${dark ? 'dark' : ''}`}>
      <span className="browser-dots">
        <i />
        <i />
        <i />
      </span>
      <span className="browser-address">Et nytt førsteinntrykk</span>
      <span>↗</span>
    </div>
  );
}
