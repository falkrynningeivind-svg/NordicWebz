import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import {
  ProblemSection,
  Services,
  WhyUs,
  Comparison,
  Process,
  About,
  Footer,
} from '@/components/sections';
import { Pricing } from '@/components/pricing';
import { Portfolio } from '@/components/portfolio';
import { FAQ } from '@/components/faq';
import { Contact } from '@/components/contact';
import { Reveal } from '@/components/reveal';
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ProblemSection />
        <Services />
        <Pricing />
        <WhyUs />
        <Comparison />
        <Process />
        <Portfolio />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Reveal />
    </>
  );
}
