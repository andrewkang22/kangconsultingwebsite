"use client";

import { m, useInView } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

export function FadeIn({ children, className, delay = 0, y = 16, duration = 0.6 }: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const [fallback, setFallback] = useState(false);

  // Fallback: if inView doesn't fire shortly after mount (e.g., route transitions), reveal anyway
  useEffect(() => {
    const t = setTimeout(() => setFallback(true), 700);
    return () => clearTimeout(t);
  }, []);

  const shouldShow = inView || fallback;

  return (
    <m.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shouldShow ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ delay, duration, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
