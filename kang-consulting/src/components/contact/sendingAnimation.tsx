"use client";

import { m, useReducedMotion, type Transition } from "framer-motion";
import type { HTMLAttributes } from "react";

function EnvelopeIcon({ className, ...props }: HTMLAttributes<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 88 56" fill="none" className={className} {...props}>
      <rect x="1" y="1" width="86" height="54" rx="10" fill="#fffaf2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10L44 34L85 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 46L28 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M85 46L60 28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="62" y="6" width="18" height="18" rx="2" fill="#fddb5d" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function SendingAnimation() {
  const prefersReducedMotion = useReducedMotion();

  const envelopeAnimation = prefersReducedMotion
    ? { x: "0%", y: "0%", rotate: "0deg" }
    : {
        x: ["-10%", "20%", "55%", "90%"],
        y: ["0%", "-10%", "6%", "0%"],
        rotate: ["-4deg", "3deg", "-2deg", "-4deg"],
      };

  const envelopeTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 3, repeat: Infinity, repeatType: "loop", ease: "easeInOut" };

  const badgeAnimation = prefersReducedMotion
    ? { scale: 1 }
    : { scale: [1, 1.08, 1], rotate: [0, 1.5, 0] };

  const badgeTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" };

  const progressAnimation = prefersReducedMotion ? { x: "0%" } : { x: ["-90%", "0%"] };
  const progressTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" };

  const pulseAnimation = prefersReducedMotion ? { opacity: 0.7, scale: 1 } : { opacity: [0.2, 1, 0.2], scale: [0.9, 1.05, 0.9] };
  const pulseTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.8, repeat: Infinity, repeatType: "loop", ease: "easeInOut" };

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <m.div
        className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-[#0b0c10] bg-[#0b0c10] px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white"
        animate={badgeAnimation}
        transition={badgeTransition}
        aria-hidden="true"
      >
        Sending
      </m.div>

      <div className="w-full max-w-md rounded-[var(--radius-md)] border border-[#dcd7d0] bg-gradient-to-b from-white to-[#f7f3ed] p-6 text-left shadow-[var(--shadow-soft)]">
        <div className="relative h-32 w-full overflow-hidden rounded-[var(--radius-sm)] border border-dashed border-[#e6e0da] bg-white/80">
          <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-[#dcd7d0]" />
          <m.div
            className="absolute left-4 top-1/2 -translate-y-1/2"
            animate={envelopeAnimation}
            transition={envelopeTransition}
            role="img"
            aria-label="Envelope traveling to the Kang Consulting inbox"
          >
            <EnvelopeIcon className="h-14 w-20 text-black" />
          </m.div>
          <m.div
            className="absolute bottom-5 right-6 flex size-10 items-center justify-center rounded-[var(--radius-sm)] border border-black bg-white text-xs font-bold uppercase tracking-wider text-black"
            animate={pulseAnimation}
            transition={pulseTransition}
          >
            In
          </m.div>
          <m.div
            className="absolute top-6 left-6 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.3em] text-gray-500"
            animate={pulseAnimation}
            transition={pulseTransition}
            aria-hidden="true"
          >
            Outbox
          </m.div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-700">Routing to the Kang brothers</p>
          <p className="text-base leading-relaxed text-gray-700">
            We are packaging your message for direct review. The team will follow up with next steps by email.
          </p>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-[var(--radius-xs)] border border-black bg-white">
            <m.div className="h-full w-full bg-[#0b0c10]" animate={progressAnimation} transition={progressTransition} />
          </div>
        </div>
      </div>
    </div>
  );
}
