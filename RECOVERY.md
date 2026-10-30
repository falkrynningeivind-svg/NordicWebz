# Gjenoppretting av NordicWebz — 30. oktober 2026

Denne grenen sikrer den eldre kildekoden fra `/workspace/NordicWebz-source.zip` (29. oktober). Dette er **ikke** kildekoden til den sist godkjente publiseringen. Ikke slå grenen sammen med `main` eller publiser den som erstatning for den godkjente siden.

## Sikret kilde

ZIP SHA-256: `3eb302c4228d834c161ca235fc2bab09a4b1ec48fcd0a5457bd37d2f3b8293bc`.

Arkivets programfiler er beholdt. Den gamle rotfilen `index.html` er fjernet fra denne grenen for å unngå å forveksle den med Next.js-applikasjonen. ZIP-originalen og den opprinnelige arbeidsmappen er urørt.

## Bekreftet tilstand

- Fil- og terminaltilgang fungerer. Tilknyttet miljø rapporterte `running` og `connected`.
- Den opprinnelige Git-mappen har bare to gamle commits; ingen utilknyttede Git-objekter ble funnet av `git fsck --full --no-reflogs`.
- GitHub hadde bare `main`, på `05df1041a78d6455faafd7d26732d66772daf296` (Create README.md).
- Hovedadressen returnerte den gamle velkomstsiden.
- Godkjent publisering omdirigerte til Vercel-innlogging.
- Vercel API ga HTTP 403. Ingen Vercel-verktøy eller Vercel-token er tilgjengelig i denne økten.
- `cloud-environment-onboarding:setup` var ikke tilgjengelig; eksisterende miljø var tilgjengelig og ble beholdt.

## Kilden som fortsatt må gjenfinnes

Publisering: https://nordicwebz424-lxsgb42h6-falkrynningeivind-svg.vercel.app

Deployment-ID: `dpl_8eAM5LRrETNFLwukX5GQ9jT4RQ8B`

Vercel-prosjekt: https://vercel.com/falkrynningeivind-svg/nordicwebz424

Arkivet bruker Manrope og har en eldre hero. Den godkjente versjonen bruker Satoshi og GSAP, overskriften «Vi gjør bedriften din synlig.» med «synlig.» alene, og en blyant som tegner understreken. Arkivet må derfor ikke behandles som en eksakt gjenoppretting.

## Videre arbeid

1. Hent kildekoden fra det gamle miljøet eller en eksport/tilgjengelig Vercel-kilde. Behold eksisterende miljø og publisering.
2. Ved Vercel-tilgang: undersøk deployment-metadata og tilgjengelige kildefiler før ombygging. Bygde JavaScript-filer er ikke en fullverdig kildekodebackup.
3. Gjenopprett på en egen gren og kontroller Next.js-bygg, mobil, navigasjon, hover-kort og animasjoner med redusert bevegelse.
4. Behold menyen Tjenester, Prosjekter, Om oss, Priser, Kontakt; prisene 2 990 kr, 4 990 kr, 2 290 kr; elevbedrift uten elevantall eller klassetrinn. Ikke legg til oppdiktede referanser eller unødvendige seksjoner.
5. Kontaktskjema skal bare vise sendt-status etter bekreftet mottak. Arkivet har støtte for konfigurert HTTPS-endepunkt og ærlig ikke-sendt-status uten mottaker.
6. Lagre den endelige kildekoden i GitHub før produksjonspublisering. Kontroller Vercels prosjektrot, rammeverk, produksjonsgren og commit-SHA slik at neste GitHub-publisering bygger den samme kildekoden.

## Rediger reserveversjonen lokalt

```sh
npm ci
npm run dev
```

Dette gjør den eldre reserveversjonen redigerbar. Det aktiverer ikke det låste miljøutkastet eller Vercel-tilgang.

## Kontroller av reserveversjonen

`npm ci`, `npm run typecheck` og `npm run build` besto. Alle fem eksisterende Playwright-tester besto med Chromium: metadata/priser/lenker, skjemavalidering og ikke-sendt-status, tastaturdialog, mobilmeny og skjermbredder, samt automatiske WCAG-kontroller. Dette bekrefter reserveversjonens funksjoner, ikke samsvar med den nyere godkjente versjonen.
