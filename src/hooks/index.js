import { useState, useEffect, useRef, useCallback } from "react";

/**
 * useInView — triggers when element enters the viewport.
 * Returns [ref, isVisible].
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/**
 * useTilt — adds a 3D perspective tilt effect to an element on mouse move.
 * Returns { ref, onMouseMove, onMouseLeave } to spread onto the target element.
 */
export function useTilt(maxDeg = 8) {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * maxDeg}deg) rotateY(${x * maxDeg}deg) translateY(-6px) scale(1.02)`;
    el.style.transition = "transform 0.08s ease";
  }, [maxDeg]);
  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
    el.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
  }, []);
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave };
}
