export const site = {
  name: 'NordicWebz',
  description:
    'NordicWebz lager moderne og profesjonelle nettsider for bedrifter som ønsker en sterkere digital tilstedeværelse – til en rimelig pris.',
  email: '',
  phone: '',
  // Legg inn en HTTPS-adresse til en skjematjeneste som støtter JSON, for eksempel Formspree.
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '',
  socials: [] as { name: string; url: string }[],
};
export const navigation = [
  ['Hjem', 'hjem'],
  ['Tjenester', 'tjenester'],
  ['Priser', 'priser'],
  ['Hvorfor oss', 'hvorfor-oss'],
  ['Prosessen', 'prosessen'],
  ['Om oss', 'om-oss'],
  ['Kontakt', 'kontakt'],
];
export const packages = [
  {
    id: 'enkel',
    name: 'Enkel nettside',
    price: '2 990',
    description:
      'En profesjonell start på nett. Alt det viktigste, samlet i en oversiktlig nettside.',
    cta: 'Velg enkel nettside',
    features: [
      'Moderne design tilpasset bedriften',
      'Responsiv på mobil, nettbrett og PC',
      'Tydelig presentasjon av bedriften',
      'Kontaktinformasjon og tydelige CTA-er',
      'Grunnleggende SEO-oppsett',
      'Enkel struktur og god brukervennlighet',
    ],
  },
  {
    id: 'premium',
    name: 'Premium nettside',
    price: '4 990',
    description:
      'For deg som vil skille deg ut. Mer skreddersøm, flere detaljer og et unikt uttrykk.',
    cta: 'Velg Premium',
    features: [
      'Alt fra Enkel nettside',
      'Mer avansert og detaljert design',
      'Flere seksjoner og mer innhold',
      'Animasjoner og interaktive elementer',
      'Skreddersydd brukeropplevelse',
      'Mer designarbeid og større detaljnivå',
      'Unik layout tilpasset identiteten deres',
    ],
  },
  {
    id: 'forbedring',
    name: 'Forbedring av nettside',
    price: '2 290',
    description:
      'Gi nettsiden du allerede har et løft. Et friskere uttrykk og en bedre opplevelse.',
    cta: 'Forbedre nettsiden min',
    features: [
      'Gjennomgang av eksisterende nettside',
      'Forbedring av design og layout',
      'Bedre mobiltilpasning og struktur',
      'Tydeligere typografi og mer luft',
      'Oppdaterte visuelle elementer',
      'Bedre CTA-er og presentasjon',
      'Enklere navigasjon og brukervennlighet',
    ],
  },
];
export const services = [
  {
    icon: 'web',
    title: 'Nye nettsider',
    text: 'Fra en god idé til en komplett nettside. Tilpasset bedriften din og menneskene du vil nå.',
  },
  {
    icon: 'design',
    title: 'Redesign',
    text: 'Gi den gamle nettsiden et nytt kapittel, med et mer moderne og profesjonelt uttrykk.',
  },
  {
    icon: 'mobile',
    title: 'Mobiltilpasning',
    text: 'En like god opplevelse på mobil, nettbrett og PC. Fordi kundene dine er overalt.',
  },
  {
    icon: 'spark',
    title: 'Moderne design',
    text: 'Gjennomtenkte detaljer, tydelig informasjon og et uttrykk som passer bedriften din.',
  },
  {
    icon: 'search',
    title: 'Synlighet',
    text: 'God struktur og grunnleggende SEO gir et bedre utgangspunkt for å bli funnet på nettet.',
  },
  {
    icon: 'tools',
    title: 'Videre oppdateringer',
    text: 'Trenger nettsiden oppdateringer senere? Ta kontakt med oss for å høre hvilke muligheter vi kan tilby.',
  },
];
export const reasons = [
  {
    title: 'Rimelige priser',
    text: 'Som elevbedrift har vi lavere kostnader enn mange tradisjonelle webbyråer. Det gir deg en konkurransedyktig pris.',
  },
  {
    title: 'Kvalitet i detaljene',
    text: 'Vi fokuserer på moderne design, god brukervennlighet og et profesjonelt resultat – uansett hvilken pakke du velger.',
  },
  {
    title: 'Personlig samarbeid',
    text: 'Du snakker direkte med teamet som lager nettsiden. Kort vei fra spørsmål til svar, og fra idé til løsning.',
  },
  {
    title: 'Et moderne perspektiv',
    text: 'Vi har vokst opp med digitale løsninger og tar med oss et friskt blikk på design og brukeropplevelser.',
  },
];
export const steps = [
  {
    title: 'Vi blir kjent',
    text: 'Vi snakker om bedriften, kundene og hva dere ønsker å oppnå. Sammen avklarer vi omfang og tidsplan.',
  },
  {
    title: 'Vi designer',
    text: 'Vi finner strukturen og det visuelle uttrykket som passer bedriften. Du er med og gir innspill.',
  },
  {
    title: 'Vi bygger',
    text: 'Designet blir til en fungerende nettside, tilpasset mobil, nettbrett og PC.',
  },
  {
    title: 'Klar for lansering',
    text: 'Vi går gjennom resultatet sammen. Når du er fornøyd, gjør vi nettsiden klar for publisering.',
  },
];
// Erstatt med ekte prosjekter og sett example til false først når prosjektet faktisk er levert.
export const projects = [
  {
    id: 'cafe',
    title: 'En smakfull tilstedeværelse',
    category: 'Restaurant / kafé',
    example: true,
    style: 'cafe',
    heading: 'Små pauser.\nStore smaker.',
    label: 'KAFÉ · KONSEPT',
    description:
      'Et varmt, redaksjonelt konsept med plass til meny, atmosfære og de gode råvarene.',
  },
  {
    id: 'craft',
    title: 'Godt håndverk, også digitalt',
    category: 'Lokal håndverker',
    example: true,
    style: 'craft',
    heading: 'Bygget for\nå vare.',
    label: 'HÅNDVERK · KONSEPT',
    description:
      'Et tydelig og solid uttrykk med oversikt over tjenester og en enkel vei til kontakt.',
  },
  {
    id: 'salon',
    title: 'Et uttrykk med personlighet',
    category: 'Frisør / salong',
    example: true,
    style: 'salon',
    heading: 'Din stil.\nDitt øyeblikk.',
    label: 'SALONG · KONSEPT',
    description:
      'Et rent og elegant konsept som gir behandlingene og salongens identitet hovedrollen.',
  },
];
// Fyll inn navn og roller når teamet har bestemt hva som skal publiseres.
export const team = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  name: '',
  role: '',
  initials: '',
}));
export const faqs = [
  {
    question: 'Hva koster en nettside?',
    answer: `En enkel nettside koster ${packages[0].price} kr. Premium koster ${packages[1].price} kr, og forbedring av en eksisterende nettside koster ${packages[2].price} kr. Krever prosjektet noe utover standardpakken, gir vi et tilpasset tilbud.`,
  },
  {
    question: 'Hva er forskjellen på Enkel og Premium?',
    answer:
      'Enkel gir deg en moderne og profesjonell nettside med det viktigste på plass. Premium gir mer designarbeid, skreddersøm og detaljnivå, flere seksjoner og mer avanserte animasjoner og interaktive elementer.',
  },
  {
    question: 'Hvor lang tid tar det å lage en nettside?',
    answer:
      'Det varierer med prosjektets størrelse og behov. Vi avtaler en tidsplan sammen før vi starter.',
  },
  {
    question: 'Kan dere forbedre nettsiden vi allerede har?',
    answer: `Ja. Vi tilbyr forbedring av eksisterende nettsider for ${packages[2].price} kr. Vi går gjennom nettsiden og avklarer hva som inngår før vi starter.`,
  },
  {
    question: 'Fungerer nettsidene på mobil?',
    answer:
      'Ja. Nettsidene vi lager er responsive og tilpasses mobil, nettbrett og PC.',
  },
  {
    question: 'Er NordicWebz en elevbedrift?',
    answer:
      'Ja. Vi er syv elever i 10. klasse. Gjennom elevbedriften bygger vi erfaring innen webutvikling, design, samarbeid og entreprenørskap.',
  },
  {
    question: 'Hva om vi trenger noe utenfor standardpakkene?',
    answer:
      'Fortell oss hva bedriften trenger, så vurderer vi prosjektet sammen og gir et tilpasset, uforpliktende tilbud.',
  },
];
