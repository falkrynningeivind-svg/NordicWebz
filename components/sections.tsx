import {
  ArrowUpRight,
  Globe2,
  RefreshCw,
  Smartphone,
  Check,
} from 'lucide-react';
import { reasons, steps, navigation, site } from '@/lib/content';
import { Logo } from './ui';
import { MotionToggle } from './motion-toggle';
export function ProblemSection() {
  return (
    <section className="section problem">
      <div className="container">
        <div className="split-heading">
          <h2>
            God bedrift.
            <br />
            <span className="muted">Men viser nettsiden det?</span>
          </h2>
          <p className="heading-aside">
            Det første møtet skjer ofte på nett.
            <br />
            Vi hjelper deg å gjøre det til et godt et.
          </p>
        </div>
        <div className="problem-grid">
          {[
            [
              Globe2,
              'Ingen nettside?',
              'Gi kundene et sted å finne deg, bli kjent med bedriften og ta kontakt.',
            ],
            [
              RefreshCw,
              'Fast i fortiden?',
              'En god bedrift fortjener et førsteinntrykk som gjenspeiler kvaliteten dere leverer.',
            ],
            [
              Smartphone,
              'Vanskelig på mobilen?',
              'Gjør det enkelt for kundene dine, uansett hvilken skjerm de bruker.',
            ],
          ].map(([Icon, title, text]) => {
            const I = Icon as typeof Globe2;
            return (
              <div key={String(title)} className="reveal">
                <I size={20} strokeWidth={1.3} />
                <h3>{String(title)}</h3>
                <p>{String(text)}</p>
              </div>
            );
          })}
        </div>
        <a href="#tjenester" className="text-link">
          Vi finner en løsning som passer bedriften din{' '}
          <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}
export function Process() {
  return (
    <section id="prosessen" className="section process">
      <div className="container">
        <div className="split-heading">
          <h2>
            Fra idé til prototype.
            <br />
            <span className="prototype-emphasis">Innen 24 timer.</span>
          </h2>
          <p className="heading-aside">
            Når vi har avklart behovene dine, lager vi en første prototype innen
            24 timer. Deretter utvikler vi nettsiden sammen med deg, steg for
            steg.
          </p>
        </div>
        <div className="prototype-path" aria-label="Slik jobber vi sammen">
          <span>Din idé</span>
          <span aria-hidden="true">↗</span>
          <span>Prototype på 24 t</span>
          <span aria-hidden="true">↗</span>
          <span>Vi utvikler sammen</span>
        </div>
        <div className="steps">
          {steps.map((step, i) => (
            <article className="stack-step" key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function WhyUs() {
  return (
    <section className="section why" id="hvorfor-oss">
      <div className="container">
        <div className="split-heading">
          <h2>
            Ambisiøst design.
            <br />
            <span className="muted">Jordnære priser.</span>
          </h2>
          <p className="heading-aside">
            Et godt samarbeid gjør en forskjell.
            <br />
            Her er hva du kan forvente av oss.
          </p>
        </div>
        <div className="reasons-grid">
          {reasons.map((reason) => (
            <article className="reveal" key={reason.title}>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
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
        <div className="split-heading">
          <h2>
            Vi bygger nettsider.
            <br />
            <span className="muted">Og gode samarbeid.</span>
          </h2>
          <span className="about-badge">
            <span /> ELEVBEDRIFT · NORGE
          </span>
        </div>
        <div className="about-body">
          <p>
            NordicWebz er en elevbedrift. Vi bruker interessen vår for
            teknologi, design og entreprenørskap til å hjelpe bedrifter med å få
            en bedre digital tilstedeværelse.
          </p>
          <p>
            Vi tror at en god nettside ikke trenger å koste ekstremt mye. Derfor
            kombinerer vi moderne design, personlig samarbeid og rimelige
            priser.
          </p>
        </div>
        <a className="text-link" href="#kontakt">
          Bli kjent med oss <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
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
            {navigation.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="footer-contact">
            <a href="#kontakt" className="text-link">
              La oss skape noe sammen <ArrowUpRight size={15} />
            </a>
            <span>Elevbedrift · Norge</span>
            {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          </div>
        </div>
        <div className="footer-meta">
          <span>
            © {new Date().getFullYear()} NordicWebz. Alle rettigheter reservert.
          </span>
          <MotionToggle />
        </div>
        <div className="footer-wordmark" aria-hidden="true">
          {'NordicWebz.'.split('').map((letter, index) => (
            <span className="footer-wordmark-char" key={index}>
              {letter}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
