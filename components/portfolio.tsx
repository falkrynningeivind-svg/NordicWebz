'use client';
import { useRef, useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { projects } from '@/lib/content';
import { ConceptPreview } from './concept-preview';
export function Portfolio() {
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const p = projects[selected];
  return (
    <section id="prosjekter" className="section portfolio">
      <div className="container">
        <div className="split-heading">
          <h2>
            Tre bransjer.
            <br />
            Tre helt egne uttrykk.
          </h2>
          <p className="heading-aside">
            Nettsider vi kan lage.
            <br />
            Designkonsepter som viser mulighetene.
          </p>
        </div>
        <div className="portfolio-stage" data-scroll-media>
          <div className="project-preview">
            <ConceptPreview project={p} />
            <button
              ref={trigger}
              type="button"
              className="project-open"
              aria-label={`Se ${p.category.toLowerCase()} – eksempelprosjekt`}
              onClick={() => dialog.current?.showModal()}
            >
              <ArrowUpRight size={25} />
            </button>
          </div>
        </div>
        <div className="project-info">
          <div>
            <span className="example-label">
              Eksempelprosjekt · {p.category}
            </span>
            <h3>{p.title}</h3>
          </div>
          <p>{p.description}</p>
        </div>
        <div className="portfolio-controls">
          <div
            className="project-tabs"
            role="group"
            aria-label="Velg eksempelprosjekt"
          >
            {projects.map((project, i) => (
              <button
                key={project.id}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
              >
                <span>0{i + 1}</span>
                {project.category}
              </button>
            ))}
          </div>
          <div className="project-arrows">
            <button
              type="button"
              aria-label="Forrige prosjekt"
              onClick={() => setSelected((selected + 2) % 3)}
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Neste prosjekt"
              onClick={() => setSelected((selected + 1) % 3)}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <dialog
          ref={dialog}
          className="project-dialog"
          onClose={() => trigger.current?.focus()}
          onClick={(e) => {
            if (e.target === e.currentTarget) dialog.current?.close();
          }}
        >
          <div className="dialog-top">
            <span>Eksempelprosjekt · {p.category}</span>
            <button
              type="button"
              aria-label="Lukk prosjekt"
              onClick={() => dialog.current?.close()}
            >
              <X size={22} />
            </button>
          </div>
          <ConceptPreview project={p} />
          <p>
            Et illustrerende designkonsept fra NordicWebz. Dette er ikke et
            levert kundeprosjekt.
          </p>
        </dialog>
      </div>
    </section>
  );
}
