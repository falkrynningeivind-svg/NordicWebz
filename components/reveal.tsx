'use client';
import { useEffect } from 'react';
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.07 },
    );
    document.querySelectorAll('.reveal').forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        el.classList.add('will-reveal');
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
