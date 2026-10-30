# NordicWebz

En responsiv nettside på norsk, bygget med Next.js 15, React 19, TypeScript, Tailwind CSS 4 og Lucide. Designkonseptene er laget med HTML/CSS og krever ingen eksterne bilder eller fonter.

## Utvikling

Krever Node.js 22 eller nyere (verifisert med Node.js 24).

```sh
npm ci
npm run dev
```

Åpne port 3000 i ditt lokale utviklingsmiljø.

```sh
npm run typecheck
npm run build
npm start
```

## Rediger innhold

- `lib/content.ts`: priser, tjenester, FAQ, team, prosjekter, e-post, telefon og sosiale lenker.
- `components/`: seksjoner og gjenbrukbare komponenter.
- `app/globals.css`: farger, typografi, mockups og responsive oppsett.
- `app/layout.tsx`: SEO og delingsmetadata.
- `public/icon.svg`: logoikon som kan erstattes.

Teamnavn, roller og kontaktopplysninger er bevisst ikke oppdiktet. Fyll inn disse i `lib/content.ts` før publisering. Sosiale lenker vises bare når de er lagt inn. Prosjektene er merket som eksempler og åpnes i en tastaturtilgjengelig dialog.

## Aktiver kontaktskjema

Skjemaet validerer obligatoriske felt og forhåndsvelger pakken fra pris-knappene. Uten et endepunkt vises det tydelig at ingen opplysninger sendes. Det viser aldri en falsk kvittering.

1. Opprett et skjema hos f.eks. Formspree, eller en egen backend som godtar JSON POST og returnerer 2xx ved bekreftet mottak.
2. Kopier `.env.example` til `.env.local` og sett `NEXT_PUBLIC_CONTACT_ENDPOINT` til skjemaets HTTPS-adresse. Dette er en offentlig adresse, aldri en API-nøkkel.
3. Start utviklingsserveren på nytt eller bygg på nytt før produksjonsstart.
4. Test faktisk mottak. Avklar lagring, personvern og eventuell databehandleravtale med leverandøren før lansering. Legg til ratebegrensning og spamvern på mottakersiden.

Resend krever en server-side rute med serverlagret nøkkel; legg aldri nøkkelen i `NEXT_PUBLIC_*`. Egen backend må validere dataene på serveren. Ved nettverksfeil bevares skjemafeltene og en tydelig feil vises.

Nettsiden bruker ingen analyseverktøy, tredjepartsbilder eller informasjonskapsler som standard. Legg til publiseringsdomene, absolutte delingsadresser og ekte prosjektbilder når de er klare.

## Nettlesertester

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

Har miljøet allerede Chromium installert, bruk `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium npm run test:e2e`. Testene dekker pakkevalg, validering og status uten skjemamottaker, FAQ, tastaturstyrt prosjektdialog, mobilmeny, åtte skjermbredder, interne lenker og automatisk WCAG 2.1 AA-kontroll. Skjematesten forutsetter at `NEXT_PUBLIC_CONTACT_ENDPOINT` er tomt. Automatisk tilgjengelighetstesting erstatter ikke en manuell gjennomgang.
