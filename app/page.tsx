import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import {
  ProblemSection,
  WhyUs,
  Process,
  About,
  Footer,
} from '@/components/sections';
import { Pricing } from '@/components/pricing';
import { Portfolio } from '@/components/portfolio';
import { FAQ } from '@/components/faq';
import { Contact } from '@/components/contact';
import { Reveal } from '@/components/reveal';
import { Services } from '@/components/services';
import { StudioMotion } from '@/components/studio-motion';
import { SectionNavigation } from '@/components/section-navigation';
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="overflow-x-clip w-full max-w-full">
        <Hero />
        <ProblemSection />
        <Services />
        <Portfolio />
        <Process />
        <WhyUs />
        <About />
        <FAQ />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <Reveal />
      <StudioMotion />
      <SectionNavigation />
    </>
  );
}
