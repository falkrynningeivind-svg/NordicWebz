'use client';
import { Check, ArrowUpRight, Sparkles } from 'lucide-react';
import { packages } from '@/lib/content';
import { SectionTitle } from './ui';
export function Pricing() {
  function selectPackage(id: string) {
    window.dispatchEvent(new CustomEvent('select-package', { detail: id }));
  }
  return (
    <section id="priser" className="section pricing">
      <div className="container">
        <div className="center-heading">
          <SectionTitle
            label="INVESTER I FØRSTEINNTRYKKET"
            title={
              <>
                Godt design skal
                <br />
                <span className="muted">være innen rekkevidde.</span>
              </>
            }
          >
            Velg løsningen som passer bedriften din.
          </SectionTitle>
        </div>
        <div className="pricing-grid">
          {packages.map((p, i) => (
            <article
              key={p.id}
              className={`price-card reveal ${p.id === 'premium' ? 'premium' : ''}`}
            >
              <div className="price-card-top">
                <span className="package-number">PAKKE 0{i + 1}</span>
                {p.id === 'premium' && (
                  <span className="premium-badge">
                    <Sparkles size={12} /> Mest omfattende
                  </span>
                )}
              </div>
              <h3>{p.name}</h3>
              <div className="price">
                {p.price}
                <span>kr</span>
              </div>
              <p className="package-description">{p.description}</p>
              <a
                onClick={() => selectPackage(p.id)}
                href="#kontakt"
                className={`button ${p.id === 'premium' ? 'button-primary' : 'button-secondary'}`}
              >
                {p.cta}
                <ArrowUpRight size={16} />
              </a>
              <div className="price-divider" />
              <span className="includes-label">DETTE FÅR DU</span>
              <ul>
                {p.features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              {p.id === 'premium' && (
                <div className="premium-footnote">
                  Mer enn effekter. Mer tid, mer skreddersøm, mer deg.
                </div>
              )}
            </article>
          ))}
        </div>
        <p className="pricing-note">
          Har bedriften din spesielle behov? <a href="#kontakt">Ta kontakt</a>,
          så finner vi en løsning og gir et uforpliktende tilbud.
        </p>
      </div>
    </section>
  );
}
