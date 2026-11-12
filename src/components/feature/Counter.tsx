import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export default function Counter({ end, suffix = "", prefix = "", duration = 1800 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(eased * end));
              if (progress < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}