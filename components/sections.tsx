import {
  ArrowUpRight,
  Globe2,
  Monitor,
  Smartphone,
  Palette,
  Sparkles,
  Search,
  Wrench,
  Check,
  ArrowRight,
  Layers,
  HeartHandshake,
  ScanLine,
} from 'lucide-react';
import {
  services,
  reasons,
  steps,
  team,
  site,
  navigation,
} from '@/lib/content';
import { Logo, OfferLink, SectionTitle } from './ui';
export function ProblemSection() {
  const items = [
    {
      icon: Globe2,
      title: 'Ingen nettside?',
      text: 'Når kundene leter etter deg på nett, bør de finne deg. Uten en nettside kan de ende hos en konkurrent.',
    },
    {
      icon: Monitor,
      title: 'Fast i fortiden?',
      text: 'En utdatert nettside kan gi feil inntrykk av en ellers profesjonell bedrift.',
    },
    {
      icon: Smartphone,
      title: 'Vanskelig på mobilen?',
      text: 'Kundene dine er på farten. Nettsiden bør være like enkel å bruke på en liten skjerm som en stor.',
    },
  ];
  return (
    <section className="section problem">
      <div className="container">
        <div className="problem-heading">
          <SectionTitle
            label="DET FØRSTE INNTRYKKET"
            title={
              <>
                God bedrift.
                <br />
                <span className="muted">Men viser nettsiden det?</span>
              </>
            }
          />
          <p>
            Nettsiden din er ofte kundens førsteinntrykk. Mange søker etter
            bedriften på nettet før de bestemmer seg. La det de finner, være
            like bra som det du leverer.
          </p>
        </div>
        <div className="problem-grid">
          {items.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="problem-item reveal">
              <span className="item-number">0{i + 1}</span>
              <Icon size={25} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="problem-note">
          <span /> Vi hjelper bedriften din med å gjøre et bedre førsteinntrykk.
        </p>
      </div>
    </section>
  );
}
const icons = {
  web: Globe2,
  design: Palette,
  mobile: Smartphone,
  spark: Sparkles,
  search: Search,
  tools: Wrench,
};
export function Services() {
  return (
    <section id="tjenester" className="section services">
      <div className="container">
        <div className="split-heading">
          <SectionTitle
            label="DET VI GJØR"
            title={
              <>
                Din bedrift.
                <br />
                Bare bedre på nett.
              </>
            }
          >
            Dette kan vi hjelpe deg med.
          </SectionTitle>
          <span className="section-aside">
            Fra første skisse til siste detalj.
            <br />
            Vi gjør veien til en god nettside enklere.
          </span>
        </div>
        <div className="services-grid">
          {services.map((service) => {
            const Icon = icons[service.icon as keyof typeof icons];
            return (
              <article key={service.title} className="service-card reveal">
                <div className="service-icon">
                  <Icon size={23} strokeWidth={1.6} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export function WhyUs() {
  return (
    <section id="hvorfor-oss" className="section">
      <div className="container why-layout">
        <div className="why-intro">
          <SectionTitle
            label="HVORFOR NORDICWEBZ?"
            title={
              <>
                Ambisiøst design.
                <br />
                <span className="muted">Jordnære priser.</span>
              </>
            }
          >
            En god nettside trenger ikke et stort byråbudsjett. Vi kombinerer et
            moderne blikk med et nært samarbeid.
          </SectionTitle>
          <OfferLink secondary>La oss bli kjent</OfferLink>
          <div className="why-graphic" aria-hidden="true">
            <div className="graphic-ring" />
            <span>
              <ScanLine size={54} strokeWidth={0.8} />
            </span>
            <small>GODE IDEER FORTJENER Å BLI SETT.</small>
          </div>
        </div>
        <div className="reason-list">
          {reasons.map((r, i) => (
            <article key={r.title} className="reason reveal">
              <span>0{i + 1}</span>
              <div>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
              </div>
              <ArrowUpRight size={19} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Comparison() {
  return (
    <section className="comparison-section">
      <div className="container comparison">
        <div>
          <span className="eyebrow">ET ALTERNATIV FOR SMÅ BEDRIFTER</span>
          <h2>
            Riktig løsning.
            <br />
            For ditt behov.
          </h2>
          <p>
            Et etablert byrå kan være riktig for store og komplekse prosjekter.
            Vi fokuserer på små bedrifter som ønsker en god og overkommelig
            start.
          </p>
        </div>
        <div className="comparison-columns">
          <article>
            <Layers size={22} />
            <h3>Tradisjonelt webbyrå</h3>
            <p>
              Ofte en større organisasjon, et bredere tjenestetilbud og en mer
              omfattende prosess. Pris og kontaktform varierer.
            </p>
          </article>
          <article>
            <span className="comparison-brand">N↗</span>
            <h3>NordicWebz</h3>
            <ul>
              {[
                'Rimelige standardpakker',
                'Direkte kontakt med teamet',
                'Personlig samarbeid',
                'Små bedrifter i fokus',
              ].map((x) => (
                <li key={x}>
                  <Check size={14} />
                  {x}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section id="prosessen" className="section process">
      <div className="container">
        <div className="split-heading">
          <SectionTitle
            label="EN ENKEL PROSESS"
            title={
              <>
                Fra «vi burde ha en nettside»
                <br />
                til «se den nye nettsiden vår».
              </>
            }
          />
          <p className="section-aside">
            Fire steg. Tett dialog.
            <br />
            Et resultat vi kan være stolte av sammen.
          </p>
        </div>
        <div className="steps">
          {steps.map((step, i) => (
            <article key={step.title} className="step reveal">
              <div className="step-top">
                <span>0{i + 1}</span>
                {i < 3 ? <ArrowRight size={18} /> : <Check size={19} />}
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function About() {
  return (
    <section id="om-oss" className="section about">
      <div className="container">
        <div className="about-layout">
          <div>
            <SectionTitle
              label="MENNESKENE BAK"
              title={
                <>
                  Unge utviklere.
                  <br />
                  <span className="muted">Seriøse ambisjoner.</span>
                </>
              }
            />
            <div className="about-signature">
              <HeartHandshake size={21} />
              <span>7 elever. Ett felles engasjement.</span>
            </div>
          </div>
          <div className="about-copy">
            <p>
              NordicWebz er en elevbedrift startet av syv elever i 10. klasse.
              Vi bruker interessen vår for teknologi, design og entreprenørskap
              til å hjelpe bedrifter med å få en bedre digital tilstedeværelse.
            </p>
            <p>
              Vi tror at en god nettside ikke trenger å koste ekstremt mye.
              Derfor kombinerer vi moderne design, personlig samarbeid og
              rimelige priser.
            </p>
          </div>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <article className="team-card" key={person.id}>
              <div className="team-avatar" aria-hidden="true">
                {person.initials || (
                  <span>
                    N<span className="avatar-slash">/</span>W
                  </span>
                )}
              </div>
              <h3>{person.name || 'Navn kommer'}</h3>
              <p>{person.role || 'Rolle kommer'}</p>
              <span className="team-index">0{person.id}</span>
            </article>
          ))}
        </div>
        <p className="team-note">
          Teamet presenteres med navn og roller når disse er klare.
        </p>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <Logo />
            <p>
              Moderne nettsider.
              <br />
              Rimelige priser.
            </p>
          </div>
          <nav aria-label="Bunnmeny">
            {navigation
              .filter(([, id]) =>
                ['hjem', 'tjenester', 'priser', 'om-oss', 'kontakt'].includes(
                  id,
                ),
              )
              .map(([label, id]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
          </nav>
          <div className="footer-contact">
            <span>LA OSS SNAKKE SAMMEN</span>
            {site.email ? (
              <a href={`mailto:${site.email}`}>{site.email}</a>
            ) : (
              <p>E-postadresse kommer</p>
            )}
            {site.phone ? (
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            ) : (
              <p>Telefonnummer kommer</p>
            )}
            {site.socials.map((s) => (
              <a key={s.name} href={s.url} rel="noreferrer" target="_blank">
                {s.name}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © NordicWebz {new Date().getFullYear()}. Alle rettigheter reservert.
          </span>
          <span>
            <span className="status-dot" /> Elevbedrift · Norge
          </span>
          <a href="#hjem">
            Til toppen <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
