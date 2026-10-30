'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { projects } from '@/lib/content';
import { SectionTitle } from './ui';
type Project = (typeof projects)[number];
function ProjectArt({ project }: { project: Project }) {
  return (
    <div className={`project-art ${project.style}`} aria-hidden="true">
      <div className="project-mini-nav">
        <span>{project.label}</span>
        <span>MENY ↗</span>
      </div>
      <div className="project-art-copy">
        <span>ET NYTT PERSPEKTIV</span>
        <h3>
          {project.heading.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </h3>
        <span className="project-mini-button">Oppdag mer ↗</span>
      </div>
      <div className="project-sculpture">
        <div />
        <div />
        <div />
      </div>
      <span className="project-art-foot">Gode opplevelser starter her.</span>
    </div>
  );
}
export function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (active) dialog.current?.showModal();
  }, [active]);
  function close() {
    dialog.current?.close();
    setActive(null);
    trigger.current?.focus();
  }
  return (
    <section className="section portfolio" id="prosjekter">
      <div className="container">
        <div className="split-heading">
          <SectionTitle
            label="ET INNBLIKK I MULIGHETENE"
            title={
              <>
                Ulike bedrifter.
                <br />
                Like gjennomtenkt.
              </>
            }
          />
          <p className="section-aside">
            Nettsider vi kan lage.
            <br />
            Tre designkonsepter. Ingen fiktive kunder.
          </p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card reveal">
              <div className="project-preview">
                <ProjectArt project={project} />
                <button
                  className="project-open"
                  onClick={(e) => {
                    trigger.current = e.currentTarget;
                    setActive(project);
                  }}
                  aria-label={`Se ${project.category.toLowerCase()} – ${project.example ? 'eksempelprosjekt' : 'levert prosjekt'}`}
                >
                  <ArrowUpRight size={20} />
                </button>
              </div>
              <div className="project-meta">
                <span>{project.category}</span>
                <span className="example-label">
                  {project.example ? 'Eksempelprosjekt' : 'Levert prosjekt'}
                </span>
              </div>
              <h3>{project.title}</h3>
            </article>
          ))}
        </div>
        <dialog
          ref={dialog}
          className="project-dialog"
          aria-labelledby="project-dialog-title"
          onCancel={(e) => {
            e.preventDefault();
            close();
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {active && (
            <div className="dialog-inner">
              <button
                className="dialog-close"
                onClick={close}
                aria-label="Lukk prosjekt"
              >
                <X />
              </button>
              <ProjectArt project={active} />
              <div className="dialog-description">
                <span className="eyebrow">
                  {active.example ? 'EKSEMPELPROSJEKT' : 'LEVERT PROSJEKT'} ·{' '}
                  {active.category}
                </span>
                <h2 id="project-dialog-title">{active.title}</h2>
                <p>{active.description}</p>
                {active.example && (
                  <p>
                    Dette er et illustrerende designkonsept, ikke et levert
                    kundeprosjekt.
                  </p>
                )}
                <a
                  className="button button-primary"
                  href="#kontakt"
                  onClick={close}
                >
                  Vil du ha noe lignende? <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          )}
        </dialog>
      </div>
    </section>
  );
}
