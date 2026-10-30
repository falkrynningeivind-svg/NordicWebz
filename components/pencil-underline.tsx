'use client';
import { useEffect, useId, useRef } from 'react';

const strokePath = 'M3 13C42 2 105 1 155 7';
const timing = { arrive: 600, draw: 850, finish: 1650, leave: 1900 };

export function PencilUnderline() {
  const gradientId = useId();
  const root = useRef<HTMLSpanElement>(null);
  const stroke = useRef<SVGPathElement>(null);
  const pencil = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const container = root.current;
    const path = stroke.current;
    const tool = pencil.current;
    if (!container || !path || !tool) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let finished = false;
    const finish = () => {
      finished = true;
      cancelAnimationFrame(frame);
      container.style.setProperty('--ink-offset', '0');
      tool.style.opacity = '0';
    };
    const stopped = () =>
      preference.matches ||
      document.documentElement.dataset.motionPaused === 'true';
    if (stopped()) {
      finish();
      return;
    }
    let width = container.clientWidth;
    let height = container.clientHeight;
    const resize = new ResizeObserver((entries) => {
      width = entries[0].contentRect.width;
      height = entries[0].contentRect.height;
    });
    resize.observe(container);
    const length = path.getTotalLength();
    const start = performance.now();
    container.style.setProperty('--ink-offset', '1');
    const smooth = (n: number) => n * n * (3 - 2 * n);
    const clamp = (n: number) => Math.max(0, Math.min(1, n));
    const draw = (now: number) => {
      if (finished) return;
      if (stopped()) {
        finish();
        return;
      }
      const elapsed = now - start;
      const progress = smooth(
        clamp((elapsed - timing.draw) / (timing.finish - timing.draw)),
      );
      const arrival = smooth(
        clamp((elapsed - timing.arrive) / (timing.draw - timing.arrive)),
      );
      const departure = smooth(
        clamp((elapsed - timing.finish) / (timing.leave - timing.finish)),
      );
      const point = path.getPointAtLength(progress * length);
      const tangent = path.getPointAtLength(
        Math.min(length, progress * length + 1),
      );
      const angle =
        (Math.atan2(
          ((tangent.y - point.y) * height) / 18,
          ((tangent.x - point.x) * width) / 160,
        ) *
          180) /
        Math.PI;
      const x = (point.x / 160) * width + (1 - arrival) * 10 + departure * 14;
      const y = (point.y / 18) * height - (1 - arrival) * 18 - departure * 22;
      tool.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle * 0.25 - departure * 8}deg)`;
      tool.style.opacity = String(arrival * (1 - departure));
      container.style.setProperty('--ink-offset', String(1 - progress));
      if (elapsed < timing.leave) frame = requestAnimationFrame(draw);
      else finish();
    };
    const onPreference = () => {
      if (stopped()) finish();
    };
    preference.addEventListener('change', onPreference);
    window.addEventListener('site-motion-change', onPreference);
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      preference.removeEventListener('change', onPreference);
      window.removeEventListener('site-motion-change', onPreference);
    };
  }, []);
  return (
    <span ref={root} className="handwritten-underline" aria-hidden="true">
      <svg
        className="handwritten-stroke"
        viewBox="0 0 160 18"
        preserveAspectRatio="none"
      >
        <path ref={stroke} d={strokePath} pathLength="1" />
      </svg>
      <span ref={pencil} className="drawing-pencil">
        <svg className="pencil-art" viewBox="0 0 80 80" fill="none">
          <defs>
            <linearGradient
              id={`${gradientId}-barrel`}
              x1="16"
              y1="51"
              x2="29"
              y2="64"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#edf1ff" />
              <stop offset=".2" stopColor="#c3d1f0" />
              <stop offset=".48" stopColor="#a5bae3" />
              <stop offset=".5" stopColor="#7f9bce" />
              <stop offset=".83" stopColor="#5473a8" />
              <stop offset="1" stopColor="#8da6d1" />
            </linearGradient>
            <linearGradient
              id={`${gradientId}-wood`}
              x1="9"
              y1="58"
              x2="24"
              y2="72"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ead7b8" />
              <stop offset=".5" stopColor="#d7b88b" />
              <stop offset="1" stopColor="#ad875d" />
            </linearGradient>
            <linearGradient
              id={`${gradientId}-metal`}
              x1="52"
              y1="10"
              x2="72"
              y2="29"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8a95a9" />
              <stop offset=".24" stopColor="#edf0f5" />
              <stop offset=".52" stopColor="#b0bacb" />
              <stop offset=".8" stopColor="#697990" />
              <stop offset="1" stopColor="#d2d9e4" />
            </linearGradient>
          </defs>
          <path d="M4 76 16 51 29 64Z" fill={`url(#${gradientId}-wood)`} />
          <path d="m4 76 5-10 5 5Z" fill="#293140" />
          <path
            d="M16 51 58 9 71 22 29 64Z"
            fill={`url(#${gradientId}-barrel)`}
          />
          <path
            d="m19 54 35-35"
            stroke="#f1f5ff"
            strokeOpacity=".7"
            strokeWidth=".8"
          />
          <path
            d="m26 61 35-35"
            stroke="#314f81"
            strokeOpacity=".5"
            strokeWidth=".7"
          />
          <path d="m57 10 4-4q3-3 6 0l7 7q3 3 0 6l-4 4Z" fill="#526786" />
          <path d="m61 6q3-3 6 0l7 7" stroke="#adbdd6" strokeWidth=".8" />
          <path d="m51 16 6-6 13 13-6 6Z" fill={`url(#${gradientId}-metal)`} />
          <path
            d="m52.5 14.5 13 13m-10-16 13 13"
            stroke="#63748f"
            strokeOpacity=".6"
            strokeWidth=".6"
          />
          <path
            d="m40 33 4-4m-1 7 4-4"
            stroke="#d9e3f6"
            strokeWidth=".7"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </span>
  );
}
