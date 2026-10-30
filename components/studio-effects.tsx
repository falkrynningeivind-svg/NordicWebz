'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger, useGSAP);
export default function StudioEffects() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-line > span', {
        y: 25,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      gsap.from('.hero-showcase', {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.25,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      const wordmark = document.querySelector('.footer-wordmark');
      if (wordmark) {
        gsap.fromTo(
          wordmark.querySelectorAll('.footer-wordmark-char'),
          { yPercent: 120, rotation: 8 },
          {
            yPercent: 0,
            rotation: 0,
            duration: 1.15,
            stagger: 0.065,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wordmark,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      }
      gsap.utils
        .toArray<HTMLElement>('[data-scroll-media]')
        .forEach((element) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.65,
              },
            })
            .fromTo(
              element,
              { scale: 0.8, opacity: 0.3 },
              { scale: 1, opacity: 1, duration: 0.35, ease: 'none' },
            )
            .to(element, {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              ease: 'none',
            })
            .to(element, { opacity: 0.2, duration: 0.25, ease: 'none' });
        });
    });
    media.add(
      '(min-width: 900px) and (prefers-reduced-motion: no-preference)',
      () => {
        const steps = gsap.utils.toArray<HTMLElement>('.stack-step');
        document.querySelector('.steps')?.classList.add('has-card-stack');
        steps.forEach((step, i) => {
          gsap.set(step, { top: 110 + i * 18 });
          if (i < steps.length - 1)
            gsap.to(step, {
              scale: 1 - (steps.length - i - 1) * 0.018,
              opacity: 0.6,
              transformOrigin: 'center top',
              ease: 'none',
              scrollTrigger: {
                trigger: steps[i + 1],
                start: `top ${310 + i * 18}px`,
                end: `top ${130 + i * 18}px`,
                scrub: 0.5,
              },
            });
        });
        return () =>
          document.querySelector('.steps')?.classList.remove('has-card-stack');
      },
    );
    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      media.revert();
    };
  }, []);
  return null;
}
