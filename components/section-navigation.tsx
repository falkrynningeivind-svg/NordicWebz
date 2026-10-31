'use client';
import { useEffect } from 'react';

const alignedSections = new Set([
  'prosessen',
  'priser',
  'kontakt',
  'prosjekter',
]);

export function SectionNavigation() {
  useEffect(() => {
    let cancelAlignment: (() => void) | undefined;
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href]')
          : null;
      if (
        !link ||
        link.hasAttribute('download') ||
        (link.target && link.target !== '_self')
      )
        return;
      const url = new URL(link.href, location.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        url.search !== location.search
      )
        return;
      const target = alignedSections.has(url.hash.slice(1))
        ? document.getElementById(url.hash.slice(1))
        : null;
      if (!target) return;
      cancelAlignment?.();
      let frame = 0;
      let cancelled = false;
      let fontsReady = document.fonts.status === 'loaded';
      document.fonts.ready.then(() => {
        fontsReady = true;
      });
      const started = performance.now();
      let stableSince = started;
      let lastScroll = scrollY;
      let lastPosition = target.getBoundingClientRect().top + scrollY;
      const cancel = () => {
        cancelled = true;
        cancelAnimationFrame(frame);
        window.removeEventListener('wheel', cancel);
        window.removeEventListener('touchstart', cancel);
        window.removeEventListener('pointerdown', cancel);
        window.removeEventListener('keydown', cancel);
      };
      cancelAlignment = cancel;
      // Keep native anchors, smooth scrolling, focus and browser history. Only
      // correct the final position after scrolling and layout have settled.
      const align = (now: number) => {
        if (cancelled) return;
        const position = target.getBoundingClientRect().top + scrollY;
        if (
          Math.abs(scrollY - lastScroll) > 0.5 ||
          Math.abs(position - lastPosition) > 0.5
        )
          stableSince = now;
        lastScroll = scrollY;
        lastPosition = position;
        if (
          (fontsReady && now - started > 400 && now - stableSince > 150) ||
          now - started > 4000
        ) {
          const header = document.querySelector('.header-inner');
          const offset = header?.getBoundingClientRect().bottom ?? 0;
          const maxScroll = Math.max(
            0,
            document.documentElement.scrollHeight - innerHeight,
          );
          const destination = Math.min(
            maxScroll,
            Math.max(0, position - offset),
          );
          cancel();
          if (Math.abs(scrollY - destination) > 0.5)
            scrollTo({ top: destination, behavior: 'instant' });
          return;
        }
        frame = requestAnimationFrame(align);
      };
      window.addEventListener('wheel', cancel, { passive: true });
      window.addEventListener('touchstart', cancel, { passive: true });
      window.addEventListener('pointerdown', cancel, { passive: true });
      window.addEventListener('keydown', cancel);
      frame = requestAnimationFrame(align);
    };
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
      cancelAlignment?.();
    };
  }, []);
  return null;
}
