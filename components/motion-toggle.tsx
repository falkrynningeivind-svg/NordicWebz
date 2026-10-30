'use client';
import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
const preferenceKey = 'nordicwebz-motion-paused';
export function MotionToggle() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener('change', update);
    try {
      if (localStorage.getItem(preferenceKey) === 'true') {
        setPaused(true);
        document.documentElement.dataset.motionPaused = 'true';
        window.dispatchEvent(new Event('site-motion-change'));
      }
    } catch {
      /* The control also works without browser storage. */
    }
    return () => preference.removeEventListener('change', update);
  }, []);
  function toggle() {
    const next = !paused;
    setPaused(next);
    document.documentElement.dataset.motionPaused = String(next);
    try {
      localStorage.setItem(preferenceKey, String(next));
    } catch {
      /* Optional persistence. */
    }
    window.dispatchEvent(new Event('site-motion-change'));
  }
  return (
    <button
      type="button"
      className="motion-toggle"
      onClick={toggle}
      aria-pressed={paused || reduced}
      disabled={reduced}
    >
      {paused || reduced ? (
        <Play size={12} aria-hidden="true" />
      ) : (
        <Pause size={12} aria-hidden="true" />
      )}
      {reduced
        ? 'Redusert bevegelse'
        : paused
          ? 'Slå på animasjoner'
          : 'Pause animasjoner'}
    </button>
  );
}
