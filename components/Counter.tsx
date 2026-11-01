"use client";

import { useEffect, useRef, useState } from "react";

export function Counter({
  value,
  format,
  className,
}: {
  value: number;
  format: (value: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / 900);
          const eased = 1 - (1 - progress) ** 3;
          setShown(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        setShown(0);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [value]);

  const finalText = format(value);
  return (
    <span ref={ref} className={className}>
      <span className="inline-grid">
        <span className="invisible col-start-1 row-start-1" aria-hidden="true">
          {finalText}
        </span>
        <span className="col-start-1 row-start-1 tabular-nums" aria-hidden="true">
          {format(shown)}
        </span>
      </span>
      <span className="sr-only">{finalText}</span>
    </span>
  );
}
