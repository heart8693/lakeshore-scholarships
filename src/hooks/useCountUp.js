import { useState, useRef, useEffect } from "react";

/* Counts from the previous value to the next one so a number that changes
   reads as a change, not a swap. Skipped entirely under reduced motion. */
export function useCountUp(value, duration = 450) {
  const [display, setDisplay] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || from.current === value) {
      from.current = value;
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const a = from.current;
    const b = value;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(a + (b - a) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else from.current = b;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return display;
}

/* Escape-to-close, shared by the drawer and the notification panel. */
export function useEscape(active, onEscape) {
  const fn = useRef(onEscape);
  fn.current = onEscape;
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => { if (e.key === "Escape") fn.current(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);
}
