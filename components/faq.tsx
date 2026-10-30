import { Plus } from 'lucide-react';
import { faqs } from '@/lib/content';
import { SectionTitle } from './ui';
export function FAQ() {
  return (
    <section className="section faq" id="sporsmal">
      <div className="container faq-layout">
        <div>
          <SectionTitle
            label="LURER DU PÅ NOE?"
            title={
              <>
                Gode spørsmål.
                <br />
                <span className="muted">Ærlige svar.</span>
              </>
            }
          />
          <p>
            Finner du ikke svaret du leter etter?
            <br />
            <a className="text-link" href="#kontakt">
              Vi tar gjerne en prat ↗
            </a>
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>
                {faq.question}
                <Plus size={19} />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
