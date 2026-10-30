export function MotionBand() {
  return (
    <section className="motion-band" aria-label="Kvalitet i hver detalj">
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
