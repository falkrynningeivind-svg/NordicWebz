# NordicWebz

Redigerbar utgave av NordicWebz, gjenoppbygget fra videoen av den siste godkjente siden og seks bevarte originalfiler. Dette er en tilnærmet gjenskaping, ikke en komplett eksport av den gamle publiseringen. Eksisterende Vercel-publisering og det gamle arbeidsmiljøet er ikke endret.

Stack: Next.js 15, React 19, TypeScript, Tailwind 4, GSAP og Satoshi. Siden eksporteres som statiske filer, med lokale bilder og fonter.

## Redigere og kjøre

Krever Node.js 22 eller nyere.

```sh
npm ci
npm run dev
```

Åpne http://localhost:3000. Endringer i koden vises automatisk.

- `lib/content.ts`: priser, navigasjon, eksempler, FAQ og kontaktmottaker.
- `components/hero.tsx`: hovedtekst og første prosjektvisning.
- `components/pencil-underline.tsx`: blyanten og understreken.
- `components/services.tsx`: tjenestekort, hover, tastatur og mobiltrykk.
- `components/studio-effects.tsx`: GSAP-bevegelser ved innlasting og scrolling.
- `components/sections.tsx`: innhold, prosess, om oss og footer.
- `components/portfolio.tsx`: prosjektvelger og dialog.
- `app/globals.css`: farger, typografi og mobiloppsett.
- `public/images/` og `public/fonts/`: lokale ressurser.

Originalkopiene av de seks filene som ble hentet fra Vercel er beholdt separat i arbeidsområdet. Hero og blyant er gjenbrukt; animasjonsfilen er videreutviklet. Deler som manglet, er skrevet på nytt med videoen som referanse. Eksempelbildene er nye illustrasjonsbilder, ikke ekte kundeprosjekter. Ingen kundereferanser, elevantall eller klassetrinn er lagt til.

## Bygge og kontrollere

```sh
npm run typecheck
npm run build
npm start
```

`npm run build` lager statiske filer i `out/`. `npm start` starter den medfølgende lokale visningsserveren. På Vercel brukes `vercel.json` og Next.js-byggingen. Det er ingen serverruter i denne utgaven.

```sh
npx playwright install chromium
npm run test:e2e
```

Ved eksisterende Chromium på Linux kan `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium` settes for testkommandoen. Testene dekker priser og lenker, kontaktskjema, tastatur, åtte skjermbredder, mobilmeny, prosjektvelger, tjenestekort, animasjon og redusert bevegelse, samt automatisk WCAG 2.1 AA-kontroll. Automatisk kontroll erstatter ikke manuell tilgjengelighetskontroll.

## Kontaktskjema

Skjemaet er som standard **ikke aktivert** og forteller tydelig at ingen opplysninger sendes. Det viser ikke en falsk kvittering. For å aktivere det, sett `NEXT_PUBLIC_CONTACT_ENDPOINT` til en faktisk HTTPS-mottaker som støtter JSON POST, og bygg på nytt. Adressefeltet er offentlig og må aldri inneholde en hemmelig nøkkel.

Kontroller faktisk mottak hos skjemaleverandøren. Mottakeren må håndtere servervalidering, spamvern og nødvendig personvern. E-postleverandører med hemmelige nøkler trenger en separat serverdel. Feltene beholdes ved feil, og sendt-status vises bare etter et vellykket HTTP-svar fra mottakeren.

## GitHub og Vercel

Denne utgaven ligger på grenen `rebuild/video-reference`. Den er holdt utenfor `main` for at en uferdig gjenoppretting ikke skulle erstatte den gamle siden automatisk.

Når denne utgaven skal bli hovedsiden:

1. Kontroller resultatet og slå den testede grenen sammen med `main`.
2. Kontroller i Vercel at Git-kilden er `falkrynningeivind-svg/NordicWebz`, produksjonsgrenen er `main`, prosjektroten er repository-roten og rammeverket er Next.js. Fjern eventuelle gamle prosjektinnstillinger som overstyrer bygg eller output-mappe.
3. Kontroller at publiseringen bygger den samme commit-SHA-en som GitHub viser. Ikke publiser direkte fra en lokal mappe med usikrede endringer.
4. Behold den tidligere godkjente Vercel-publiseringen som referanse og mulig tilbakeføring.

`.openai/hosting.json` identifiserer en separat privat Sites-visning. Den endrer ikke Vercel-prosjektet eller domenet.

## Ressurser

Satoshi er hentet fra Fontshare/Indian Type Foundry; se `public/fonts/SOURCE.txt` for kilde og lisens. Bilder er hentet fra Unsplash som illustrasjoner. Se `public/images/SOURCES.md`. Prosjektene er tydelig merket som eksempler.
