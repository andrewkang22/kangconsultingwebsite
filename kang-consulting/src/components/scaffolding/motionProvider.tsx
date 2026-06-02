"use client";

import { LazyMotion, domMax } from "framer-motion";
import type { ReactNode } from "react";

type MotionProviderProps = {
  children: ReactNode;
};

export default function MotionProvider({ children }: MotionProviderProps) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}
