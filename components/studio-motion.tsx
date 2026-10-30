'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const StudioEffects = dynamic(() => import('./studio-effects'), { ssr: false });
export function StudioMotion() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () =>
      setEnabled(
        !preference.matches &&
          document.documentElement.dataset.motionPaused !== 'true',
      );
    update();
    preference.addEventListener('change', update);
    window.addEventListener('site-motion-change', update);
    return () => {
      preference.removeEventListener('change', update);
      window.removeEventListener('site-motion-change', update);
    };
  }, []);
  return enabled ? <StudioEffects /> : null;
}
