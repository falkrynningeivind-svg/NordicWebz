import {
  ArrowDown,
  ArrowUpRight,
  Check,
  MousePointer2,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { BrowserBar, OfferLink } from './ui';
export function Hero() {
  return (
    <section id="hjem" className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <div className="intro-label">
            <span /> Små bedrifter. Store muligheter.
          </div>
          <h1>
            Nettsider som får
            <br className="desktop-break" /> bedriften din til å
            <br className="desktop-break" /> <span>bli lagt merke til.</span>
          </h1>
          <p>
            Vi lager moderne og profesjonelle nettsider for bedrifter som ønsker
            en sterkere digital tilstedeværelse – til en pris som faktisk er
            overkommelig.
          </p>
          <div className="hero-actions">
            <OfferLink />
            <a className="button button-secondary" href="#priser">
              Se priser <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-trust">
            {['Moderne design', 'Mobiltilpasset', 'Rimelige priser'].map(
              (text) => (
                <span key={text}>
                  <Check size={14} />
                  {text}
                </span>
              ),
            )}
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="Designkonsept av en nettside på datamaskin og mobil"
        >
          <div className="orbital orbital-one" />
          <div className="orbital orbital-two" />
          <div className="floating-label design-label">
            <span className="mini-icon">
              <Sparkles size={16} />
            </span>
            <div>
              Gjennomtenkt design<small>Helt ned til siste detalj</small>
            </div>
          </div>
          <div className="hero-browser">
            <BrowserBar />
            <div className="sample-site">
              <div className="sample-nav">
                <strong>
                  <span className="sample-symbol">✳</span> ditt neste kapittel.
                </strong>
                <span>
                  Om oss　 Tjenester　 <b>La oss snakke ↗</b>
                </span>
              </div>
              <div className="sample-body">
                <span className="sample-eyebrow">
                  LAGET FOR Å SKILLE SEG UT
                </span>
                <h2>
                  En god idé.
                  <br />
                  Et sterkere
                  <br />
                  <em>førsteinntrykk.</em>
                </h2>
                <p>
                  Gode opplevelser starter med
                  <br />
                  gjennomtenkte detaljer.
                </p>
                <span className="sample-button">
                  Oppdag mulighetene <ArrowUpRight size={12} />
                </span>
                <div className="abstract-art">
                  <div className="arch arch-back" />
                  <div className="arch arch-front" />
                  <div className="art-ball" />
                  <div className="art-plinth" />
                </div>
              </div>
              <div className="sample-bottom">
                <span>01 — DESIGN MED MENING</span>
                <span>En liten detalj. En stor forskjell. ↗</span>
              </div>
            </div>
          </div>
          <div className="phone-mockup">
            <div className="phone-camera" />
            <div className="phone-content">
              <span>
                ✳ <b>ditt neste kapittel.</b>
              </span>
              <div className="phone-arch" />
              <h3>
                Godt design.
                <br />
                Overalt.
              </h3>
              <p>
                En opplevelse som
                <br />
                følger deg.
              </p>
              <span className="phone-button">Utforsk ↗</span>
              <div className="phone-lines">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
          <div className="floating-label mobile-label">
            <Smartphone size={17} />
            <span>
              Like bra på mobil
              <Check size={13} />
            </span>
          </div>
          <div className="cursor-label">
            <MousePointer2 size={22} fill="currentColor" />
            <span>Din bedrift, bare bedre.</span>
          </div>
          <div className="mockup-caption">DESIGNKONSEPT AV NORDICWEBZ</div>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>
          Elevbedrift <span className="tiny-separator" /> Norge
        </span>
        <a href="#tjenester">
          Bli kjent med mulighetene <ArrowDown size={15} />
        </a>
        <span className="hero-coordinate">DESIGN. UTVIKLING. MULIGHETER.</span>
      </div>
    </section>
  );
}
