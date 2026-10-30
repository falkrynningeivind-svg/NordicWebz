'use client';
import { useState } from 'react';
import { ArrowDown, ArrowUpRight, MoveUpRight } from 'lucide-react';
import { projects } from '@/lib/content';
import { OfferLink } from './ui';
import { ConceptPreview } from './concept-preview';
import { PencilUnderline } from './pencil-underline';
export function Hero() {
  const [selected, setSelected] = useState(0);
  return (
    <section id="hjem" className="hero">
      <div className="container">
        <div className="hero-kicker">
          <span>Nettsider for bedrifter som vil videre.</span>
          <span>Elevbedrift · Norge</span>
        </div>
        <div className="hero-layout">
          <div className="hero-copy">
            <h1 className="max-w-6xl">
              <span className="hero-line">
                <span>Vi gjør </span>
              </span>
              <span className="hero-line">
                <span>bedriften din </span>
              </span>
              <span className="hero-line hero-line-accent">
                <span>
                  synlig
                  <PencilUnderline />.
                </span>
              </span>
            </h1>
            <p>
              Du kan faget ditt. Vi lager nettsiden som viser det. Gjennomtenkt
              design for små bedrifter, til en pris som gir mening.
            </p>
            <div className="hero-actions">
              <OfferLink />
              <a className="hero-price-link" href="#priser">
                Se priser <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <span className="hero-note-line" />
              <span>Moderne design. Mobiltilpasset. Helt ditt.</span>
            </div>
          </div>
          <div className="hero-showcase">
            <div className="showcase-heading">
              <span>Et av mange mulige uttrykk.</span>
              <span className="showcase-arrow">
                <MoveUpRight size={23} strokeWidth={1} />
              </span>
            </div>
            <div className="showcase-float">
              <div className="showcase-window" data-depth>
                <div className="showcase-bar">
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>DITT NESTE FØRSTEINNTRYKK</span>
                  <span>
                    <ArrowUpRight size={8} />
                  </span>
                </div>
                <div className="showcase-stage">
                  {projects.map((project, i) => (
                    <div
                      key={project.id}
                      className={`showcase-slide ${selected === i ? 'is-active' : ''}`}
                      aria-hidden={selected !== i}
                    >
                      <ConceptPreview project={project} priority={i === 0} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="showcase-selector"
              role="group"
              aria-label="Velg designkonsept"
            >
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                >
                  <span>0{i + 1}</span>
                  {p.category.split(' / ')[0]}
                  <span className="selector-dot" />
                </button>
              ))}
            </div>
            <div className="showcase-caption">
              <span>EKSEMPELPROSJEKTER · IKKE LEVERTE KUNDEPROSJEKTER</span>
              <span>NordicWebz</span>
            </div>
          </div>
        </div>
        <div className="hero-bottom">
          <span>
            GODE NETTSIDER.
            <br />
            <b>INGEN STORE BYRÅBUDSJETTER.</b>
          </span>
          <a href="#prosjekter">
            Se hva vi kan lage <ArrowDown size={18} />
          </a>
          <span className="hero-bottom-right">
            DESIGN MED OMTANKE.
            <br />
            UTVIKLET FOR MENNESKER.
          </span>
        </div>
      </div>
    </section>
  );
}
