export function MotionBand() {
  return (
    <section className="motion-band" aria-label="Kvalitet i hver detalj">
      <div className="motion-ribbon" aria-hidden="true">
        <div className="ribbon-track">
          {[0, 1, 2].map((i) => (
            <span className="ribbon-copy" key={i}>
              Din idé. <span>Vårt neste prosjekt.</span>
              <span className="ribbon-star">✳</span> Prototype på 24 timer.
              <span className="ribbon-star">✳</span>
            </span>
          ))}
        </div>
      </div>
      <div className="container quality-grid">
        <h2>
          Kvalitet i<br />
          hver detalj.
        </h2>
        {[
          [
            'Gjennomtenkt design',
            'Et visuelt uttrykk som passer bedriften og menneskene du vil nå.',
          ],
          [
            'Tydelig struktur',
            'En enkel vei til informasjonen kundene dine leter etter.',
          ],
          [
            'Tilpasset alle skjermer',
            'En god opplevelse på mobil, nettbrett og PC.',
          ],
        ].map(([title, text]) => (
          <div key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div className="container band-caption">
        <span>DESIGN · UTVIKLING · IDENTITET</span>
        <span>Bygget med omtanke ↗</span>
      </div>
    </section>
  );
}
