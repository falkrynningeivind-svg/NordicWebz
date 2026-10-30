'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Mail, ShieldCheck } from 'lucide-react';
import { packages, site } from '@/lib/content';
import { SectionTitle } from './ui';
type FormValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  service: string;
  message: string;
};
const initial: FormValues = {
  name: '',
  company: '',
  email: '',
  phone: '',
  website: '',
  service: '',
  message: '',
};
export function Contact() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<FormValues>>({});
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const choose = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (packages.some((p) => p.id === id)) {
        setValues((v) => ({ ...v, service: id }));
        setStatus('');
      }
    };
    window.addEventListener('select-package', choose);
    return () => window.removeEventListener('select-package', choose);
  }, []);
  function change(key: keyof FormValues, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    setStatus('');
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    const next: Partial<FormValues> = {};
    if (!values.name.trim()) next.name = 'Skriv inn navnet ditt.';
    if (!values.company.trim()) next.company = 'Skriv inn bedriftens navn.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'Skriv inn en gyldig e-postadresse.';
    if (values.phone && !/^\+?[\d\s()-]{6,20}$/.test(values.phone))
      next.phone = 'Skriv inn et gyldig telefonnummer.';
    if (!['ja', 'nei'].includes(values.website))
      next.website = 'Velg om dere har en nettside i dag.';
    if (![...packages.map((p) => p.id), 'usikker'].includes(values.service))
      next.service = 'Velg en tjeneste, eller «Usikker».';
    if (values.message.trim().length < 10)
      next.message = 'Fortell litt om prosjektet, minst 10 tegn.';
    setErrors(next);
    if (Object.keys(next).length) {
      setStatus('Se over feltene som er markert.');
      requestAnimationFrame(() =>
        form.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus(),
      );
      return;
    }
    if (!site.contactEndpoint) {
      setStatus(
        'Forespørselen er ikke sendt. Skjemaet er ikke koblet til en mottaker ennå.',
      );
      statusRef.current?.focus();
      return;
    }
    setSending(true);
    setStatus('');
    try {
      const response = await fetch(site.contactEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...values,
          service:
            packages.find((p) => p.id === values.service)?.name ??
            'Usikker / ønsker rådgivning',
        }),
      });
      if (!response.ok) throw new Error('send failed');
      setStatus(
        'Takk! Forespørselen er sendt. Vi tar kontakt med deg på e-post.',
      );
      setValues(initial);
    } catch {
      setStatus(
        'Forespørselen kunne ikke sendes. Prøv igjen senere. Feltene dine er bevart.',
      );
    } finally {
      setSending(false);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }
  const field = (
    key: 'name' | 'company' | 'email' | 'phone',
    label: string,
    placeholder: string,
    type = 'text',
  ) => (
    <div className="field">
      <label htmlFor={key}>
        {label}
        {key === 'phone' ? (
          <span> (valgfritt)</span>
        ) : (
          <span aria-hidden="true"> *</span>
        )}
      </label>
      <input
        id={key}
        name={key}
        type={type}
        value={values[key]}
        placeholder={placeholder}
        required={key !== 'phone'}
        autoComplete={
          {
            name: 'name',
            company: 'organization',
            email: 'email',
            phone: 'tel',
          }[key]
        }
        maxLength={key === 'phone' ? 30 : 160}
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        onChange={(e) => change(key, e.target.value)}
      />
      {errors[key] && (
        <span className="field-error" id={`${key}-error`}>
          {errors[key]}
        </span>
      )}
    </div>
  );
  return (
    <section className="section contact" id="kontakt">
      <div className="container contact-layout">
        <div className="contact-copy">
          <SectionTitle
            label="DITT NESTE KAPITTEL"
            title={
              <>
                Klar for en
                <br />
                <span>bedre nettside?</span>
              </>
            }
          >
            Fortell oss litt om bedriften din, så kan vi se hvordan vi kan
            hjelpe.
          </SectionTitle>
          <ul className="contact-promises">
            <li>
              <Check size={17} /> Helt uforpliktende
            </li>
            <li>
              <Check size={17} /> Direkte kontakt med teamet
            </li>
            <li>
              <Check size={17} /> En løsning tilpasset bedriften din
            </li>
          </ul>
          <div className="contact-note">
            <Mail size={21} />
            <div>
              <strong>En god nettside starter med en samtale.</strong>
              <p>Ingen spørsmål er for små.</p>
            </div>
          </div>
        </div>
        <form ref={form} onSubmit={submit} noValidate className="contact-form">
          <h3>
            Få et uforpliktende tilbud <ArrowUpRight size={20} />
          </h3>
          <p className="form-intro">
            Litt om deg. Litt om det du ønsker å skape.
          </p>
          <div className="form-grid">
            {field('name', 'Navn', 'Ditt navn')}
            {field('company', 'Bedrift', 'Bedriftens navn')}
            {field('email', 'E-post', 'deg@bedrift.no', 'email')}
            {field('phone', 'Telefonnummer', 'Telefonnummer', 'tel')}
            <div className="field">
              <label htmlFor="website">
                Har du nettside i dag? <span aria-hidden="true">*</span>
              </label>
              <select
                id="website"
                name="website"
                required
                value={values.website}
                aria-invalid={!!errors.website}
                aria-describedby={errors.website ? 'website-error' : undefined}
                onChange={(e) => change('website', e.target.value)}
              >
                <option value="">Velg et alternativ</option>
                <option value="ja">Ja</option>
                <option value="nei">Nei</option>
              </select>
              {errors.website && (
                <span className="field-error" id="website-error">
                  {errors.website}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="service">
                Hva trenger du hjelp med? <span aria-hidden="true">*</span>
              </label>
              <select
                id="service"
                name="service"
                required
                value={values.service}
                aria-invalid={!!errors.service}
                aria-describedby={errors.service ? 'service-error' : undefined}
                onChange={(e) => change('service', e.target.value)}
              >
                <option value="">Velg en tjeneste</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} – {p.price} kr
                  </option>
                ))}
                <option value="usikker">Usikker / ønsker rådgivning</option>
              </select>
              {errors.service && (
                <span className="field-error" id="service-error">
                  {errors.service}
                </span>
              )}
            </div>
            <div className="field field-full">
              <label htmlFor="message">
                Fortell litt om prosjektet <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={5000}
                required
                value={values.message}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
                placeholder="Hva gjør bedriften din, og hva ønsker dere med nettsiden?"
                onChange={(e) => change('message', e.target.value)}
              />
              {errors.message && (
                <span className="field-error" id="message-error">
                  {errors.message}
                </span>
              )}
            </div>
          </div>
          {!site.contactEndpoint && (
            <p className="form-notice">
              <span /> Skjemaet er ikke aktivert ennå. Ingen opplysninger
              sendes.
            </p>
          )}
          <button
            className="button button-primary submit-button"
            disabled={sending}
            type="submit"
          >
            {sending ? 'Sender …' : 'Send forespørsel'}
            <ArrowUpRight size={18} />
          </button>
          <p
            ref={statusRef}
            tabIndex={-1}
            role="status"
            className="form-status"
          >
            {status}
          </p>
          <p className="privacy-note">
            <ShieldCheck size={14} /> Ved innsending brukes opplysningene til å
            besvare forespørselen din.
          </p>
        </form>
      </div>
    </section>
  );
}
