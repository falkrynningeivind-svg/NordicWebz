'use client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
export default function StudioEffects() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    let disposed = false;
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.hero-line > span', {
        yPercent: 65,
        rotationX: -35,
        skewY: 3,
        opacity: 0,
        transformPerspective: 900,
        duration: 1.1,
        stagger: 0.11,
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
      gsap.from('.hero-actions, .hero-note', {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.13,
        delay: 0.45,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });
      gsap.to('.scroll-progress', {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
      });
      gsap.utils.toArray<HTMLElement>('.section h2').forEach((heading) => {
        SplitText.create(heading, {
          type: 'lines,words',
          mask: 'lines',
          autoSplit: true,
          linesClass: 'motion-line',
          wordsClass: 'motion-word',
          onSplit(split) {
            return gsap.from(split.words, {
              yPercent: 115,
              rotation: 3,
              duration: 0.9,
              stagger: 0.045,
              ease: 'power3.out',
              scrollTrigger: { trigger: heading, start: 'top 88%', once: true },
            });
          },
        });
      });
      gsap.from('.service-card', {
        y: 65,
        rotationY: -12,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.service-cards',
          start: 'top 85%',
          once: true,
        },
        clearProps: 'transform,opacity',
      });
      gsap.utils.toArray<HTMLElement>('.price').forEach((price) => {
        gsap.from(price, {
          y: 30,
          scale: 0.85,
          opacity: 0,
          duration: 1,
          ease: 'back.out(1.3)',
          scrollTrigger: { trigger: price, start: 'top 90%', once: true },
          clearProps: 'transform,opacity',
        });
      });
      gsap.from('.prototype-path > span', {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.prototype-path',
          start: 'top 90%',
          once: true,
        },
        clearProps: 'transform,opacity',
      });
      gsap.fromTo(
        '.about-body p',
        { color: '#a1ab93' },
        {
          color: '#edeee6',
          stagger: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-body',
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: 0.5,
          },
        },
      );
      gsap.from('.contact-form', {
        y: 55,
        rotation: 1.5,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-layout',
          start: 'top 85%',
          once: true,
        },
        clearProps: 'transform,opacity',
      });
      const navLinks = document.querySelectorAll<HTMLAnchorElement>(
        '.desktop-nav a, .mobile-nav a',
      );
      ['tjenester', 'prosjekter', 'om-oss', 'priser', 'kontakt'].forEach(
        (id) => {
          ScrollTrigger.create({
            trigger: '#' + id,
            start: 'top 35%',
            end: 'bottom 35%',
            onToggle(self) {
              if (self.isActive)
                navLinks.forEach((link) => {
                  if (link.hash === '#' + id)
                    link.setAttribute('aria-current', 'location');
                  else link.removeAttribute('aria-current');
                });
            },
          });
        },
      );
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
      const details = document.querySelectorAll('.faq details');
      let detailsRefresh: gsap.core.Tween | undefined;
      const refreshAfterToggle = () => {
        detailsRefresh?.kill();
        detailsRefresh = gsap.delayedCall(0.45, () =>
          ScrollTrigger.refresh(true),
        );
      };
      details.forEach((detail) =>
        detail.addEventListener('toggle', refreshAfterToggle),
      );
      return () => {
        detailsRefresh?.kill();
        details.forEach((detail) =>
          detail.removeEventListener('toggle', refreshAfterToggle),
        );
        navLinks.forEach((link) => link.removeAttribute('aria-current'));
      };
    });
    media.add(
      '(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
      () => {
        const cleanups: (() => void)[] = [];
        const hero = document.querySelector<HTMLElement>('.hero');
        const spotlight =
          document.querySelector<HTMLElement>('.hero-spotlight');
        if (hero && spotlight) {
          gsap.set(spotlight, { xPercent: -50, yPercent: -50 });
          const x = gsap.quickTo(spotlight, 'x', {
            duration: 0.7,
            ease: 'power3.out',
          });
          const y = gsap.quickTo(spotlight, 'y', {
            duration: 0.7,
            ease: 'power3.out',
          });
          const opacity = gsap.quickTo(spotlight, 'opacity', { duration: 0.5 });
          const move = (event: PointerEvent) => {
            const bounds = hero.getBoundingClientRect();
            x(event.clientX - bounds.left);
            y(event.clientY - bounds.top);
            opacity(1);
          };
          const leave = () => opacity(0);
          hero.addEventListener('pointermove', move);
          hero.addEventListener('pointerleave', leave);
          cleanups.push(() => {
            hero.removeEventListener('pointermove', move);
            hero.removeEventListener('pointerleave', leave);
          });
        }
        const showcase = document.querySelector<HTMLElement>('.hero-showcase');
        const scene = document.querySelector<HTMLElement>('.showcase-float');
        if (showcase && scene) {
          gsap.set(scene, { transformPerspective: 1000 });
          const rx = gsap.quickTo(scene, 'rotationX', {
            duration: 0.65,
            ease: 'power3.out',
          });
          const ry = gsap.quickTo(scene, 'rotationY', {
            duration: 0.65,
            ease: 'power3.out',
          });
          const move = (event: PointerEvent) => {
            const bounds = showcase.getBoundingClientRect();
            rx(
              (-(event.clientY - bounds.top - bounds.height / 2) /
                bounds.height) *
                10,
            );
            ry(
              ((event.clientX - bounds.left - bounds.width / 2) /
                bounds.width) *
                12,
            );
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          showcase.addEventListener('pointermove', move);
          showcase.addEventListener('pointerleave', leave);
          cleanups.push(() => {
            showcase.removeEventListener('pointermove', move);
            showcase.removeEventListener('pointerleave', leave);
          });
        }
        document
          .querySelectorAll<HTMLElement>('.button, .header-cta, .project-open')
          .forEach((button) => {
            button.classList.add('has-magnetic');
            let bounds: DOMRect;
            const x = gsap.quickTo(button, 'x', {
              duration: 0.4,
              ease: 'power3.out',
            });
            const y = gsap.quickTo(button, 'y', {
              duration: 0.4,
              ease: 'power3.out',
            });
            const enter = () => {
              bounds = button.getBoundingClientRect();
            };
            const move = (event: PointerEvent) => {
              if (!bounds) return;
              x(
                gsap.utils.clamp(
                  -7,
                  7,
                  (event.clientX - bounds.left - bounds.width / 2) * 0.12,
                ),
              );
              y(
                gsap.utils.clamp(
                  -5,
                  5,
                  (event.clientY - bounds.top - bounds.height / 2) * 0.18,
                ),
              );
            };
            const leave = () => {
              x(0);
              y(0);
            };
            button.addEventListener('pointerenter', enter);
            button.addEventListener('pointermove', move);
            button.addEventListener('pointerleave', leave);
            cleanups.push(() => {
              button.removeEventListener('pointerenter', enter);
              button.removeEventListener('pointermove', move);
              button.removeEventListener('pointerleave', leave);
              button.classList.remove('has-magnetic');
            });
          });
        gsap.utils
          .toArray<HTMLElement>('.service-card > img')
          .forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -5, scale: 1.18 },
              {
                yPercent: 5,
                scale: 1.18,
                ease: 'none',
                scrollTrigger: {
                  trigger: image.parentElement,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.7,
                },
              },
            );
          });
        return () => cleanups.forEach((cleanup) => cleanup());
      },
    );
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
      if (!disposed) ScrollTrigger.refresh(true);
    });
    return () => {
      disposed = true;
      media.revert();
    };
  }, []);
  return null;
}
