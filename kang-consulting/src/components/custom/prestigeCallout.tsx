"use client";

import Button from "@/components/custom/button";

interface PrestigeCalloutProps {
  heading: string;
  description: string;
  ctaHref: string;
  eyebrow?: string;
  footnote?: string;
  wrapperClassName?: string;
  cardClassName?: string;
  ctaLabel?: string;
}

export default function PrestigeCallout({
  heading,
  description,
  ctaHref,
  eyebrow = "Prestige access",
  footnote = "Limited cohort · contact for full scope",
  wrapperClassName = "",
  cardClassName = "",
  ctaLabel = "Contact for details",
}: PrestigeCalloutProps) {
  return (
    <section className={`py-12 ${wrapperClassName}`.trim()}>
      <div className="mx-auto max-w-4xl px-6">
        <div
          className={`rounded-[var(--radius-md)] border border-[#dcd7d0] bg-white px-8 py-10 text-center text-black shadow-[var(--shadow-soft)] ${cardClassName}`.trim()}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">{eyebrow}</p>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-black">{heading}</h3>
          <p className="mt-4 text-lg text-gray-700">{description}</p>
          <div className="mt-6 flex items-center justify-center">
            <Button href={ctaHref} variant="solid">
              {ctaLabel}
            </Button>
          </div>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-gray-500">{footnote}</p>
        </div>
      </div>
    </section>
  );
}
