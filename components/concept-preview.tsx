import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/lib/content';
export type Project = (typeof projects)[number];
export function ConceptPreview({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <div className={`concept concept-${project.style}`} aria-hidden="true">
      <div className="concept-nav">
        <span>
          {project.style === 'cafe'
            ? 'bord & samtale'
            : project.style === 'craft'
              ? 'FORM / FUNKSJON'
              : 'atelier.'}
        </span>
        <span>
          OM OSS <i /> KONTAKT <ArrowUpRight size={9} />
        </span>
      </div>
      <div className="concept-main">
        <div className="concept-copy">
          <span className="concept-label">{project.label}</span>
          <h3>
            {project.heading.split('\n').map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h3>
          <p>
            {project.style === 'cafe'
              ? 'Gode råvarer. God tid. Et sted å lande.'
              : project.style === 'craft'
                ? 'Omtanke i hver linje. Kvalitet i hver detalj.'
                : 'Rom for personlighet. Plass til deg.'}
          </p>
          <span className="concept-cta">
            {project.style === 'cafe' ? 'OPPDAG MENYEN' : 'BLI KJENT MED OSS'}{' '}
            <ArrowUpRight size={11} />
          </span>
        </div>
        <div className="concept-photo">
          <Image
            src={`/images/${project.style}.webp`}
            alt=""
            fill
            sizes="(max-width: 700px) 45vw, 500px"
            priority={priority}
          />
        </div>
      </div>
      <div className="concept-bottom">
        <span>LOKALT. PERSONLIG. GJENNOMTENKT.</span>
        <span>01 — 03</span>
      </div>
    </div>
  );
}
