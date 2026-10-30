'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  Globe2,
  RefreshCw,
  Smartphone,
  Search,
} from 'lucide-react';
const items = [
  {
    title: 'En ny nettside',
    lead: 'Et sted kundene dine vil bli.',
    text: 'Vi bygger en nettside med et uttrykk som passer bedriften, en oversiktlig struktur og en tydelig vei til kontakt.',
    image: 'web',
    Icon: Globe2,
  },
  {
    title: 'Et nytt uttrykk',
    lead: 'Behold bedriften. Forny inntrykket.',
    text: 'Vi gir den eksisterende nettsiden et løft, med tydeligere design, oppdatert innhold og bedre brukervennlighet.',
    image: 'design',
    Icon: RefreshCw,
  },
  {
    title: 'En god opplevelse',
    lead: 'Like gjennomført. På alle skjermer.',
    text: 'Fra den lille mobilskjermen til den store skjermen på kontoret. Nettsiden tilpasses menneskene som bruker den.',
    image: 'mobile',
    Icon: Smartphone,
  },
  {
    title: 'Et bedre utgangspunkt',
    lead: 'Enklere å finne. Enklere å forstå.',
    text: 'God struktur, tydelige tekster og grunnleggende SEO gir bedriften et bedre utgangspunkt for å bli funnet.',
    image: 'search',
    Icon: Search,
  },
];
export function Services() {
  const [active, setActive] = useState(0);
  return (
    <section className="section services" id="tjenester">
      <div className="container">
        <div className="split-heading">
          <div>
            <span className="eyebrow">DET VI KAN HJELPE DEG MED</span>
            <h2>
              Det skal føles
              <br />
              som din bedrift.
            </h2>
            <p>
              Vi gjør teknologi og design til en tydelig presentasjon av det
              <br className="desktop-only" /> dere faktisk leverer.
            </p>
          </div>
          <p className="heading-aside">
            Fra første skisse til ferdig nettside.
            <br />
            Et tett samarbeid hele veien.
          </p>
        </div>
        <div className="service-cards" onMouseLeave={() => setActive(0)}>
          {items.map(({ title, lead, text, image, Icon }, i) => (
            <button
              type="button"
              key={title}
              className={`service-card ${active === i ? 'is-expanded' : ''}`}
              aria-expanded={active === i}
              aria-controls={`service-detail-${i}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  e.preventDefault();
                  const next = (i + (e.key === 'ArrowRight' ? 1 : 3)) % 4;
                  setActive(next);
                  (
                    e.currentTarget.parentElement?.children[next] as HTMLElement
                  )?.focus();
                }
              }}
            >
              <Image
                src={`/images/service-${image}.webp`}
                alt=""
                fill
                sizes="(max-width: 700px) 90vw, 600px"
              />
              <span className="service-shade" />
              <ArrowUpRight className="service-arrow" size={20} />
              <span className="service-content">
                <Icon size={22} strokeWidth={1.3} />
                <span className="service-title">{title}</span>
                <span
                  className="service-detail"
                  id={`service-detail-${i}`}
                  aria-hidden={active !== i}
                >
                  <strong>{lead}</strong>
                  <span>{text}</span>
                  <span className="service-tags">
                    Design · Utvikling · Samarbeid
                  </span>
                </span>
              </span>
              <span className="service-bottom" aria-hidden="true">
                Se hva vi kan skape sammen <ArrowUpRight size={15} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
