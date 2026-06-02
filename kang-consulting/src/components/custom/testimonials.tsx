"use client";

import Image from "next/image";
import { useState } from "react";

export type TestimonialItem = {
  title?: string;
  quote: string;
  author: string;
  role?: string;
  initial?: string;
  imageSrc?: string;
  imageAlt?: string;
};

type TestimonialsProps = {
  caption?: string;
  title: string;
  subtitle?: string;
  highlight?: string;
  items: TestimonialItem[];
  className?: string;
};

const getTestimonialKey = (item: TestimonialItem) =>
  item.imageSrc ?? `${item.author}-${item.title ?? item.quote}`;

function Card({ t }: { t: TestimonialItem }) {
  const fallbackInitial = t.initial ?? (t.author ? t.author.charAt(0) : "?");

  return (
    <figure className="relative w-full rounded-[var(--radius-md)] border border-[#e0d8cf] bg-white px-5 py-8 text-center shadow-[0_28px_55px_rgba(15,23,42,0.12)] sm:px-8 sm:py-10">
      {t.title ? (
        <div className="mb-4 text-xs font-semibold tracking-[0.3em] text-black/60 uppercase">{t.title}</div>
      ) : null}
      <blockquote className="text-base leading-relaxed text-black/85 sm:text-lg">“{t.quote}”</blockquote>
      <figcaption className="mt-8 flex flex-col items-center gap-3 text-black">
        <div className="relative size-16 rounded-full border border-black/5 bg-[#f5f5f5]">
          {t.imageSrc ? (
            <Image
              src={t.imageSrc}
              alt={t.imageAlt ?? `${t.author} portrait`}
              fill
              className="rounded-full object-cover"
              sizes="64px"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xl font-semibold text-[#0f172a]">
              {fallbackInitial}
            </span>
          )}
        </div>
        <div className="text-xl font-semibold">{t.author}</div>
        {t.role ? <div className="text-base text-black/60">{t.role}</div> : null}
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ caption, title, subtitle, highlight, items, className = "" }: TestimonialsProps) {
  const safeItems = items ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!safeItems.length) return null;

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + safeItems.length) % safeItems.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % safeItems.length);
  };

  const safeActiveIndex = activeIndex < safeItems.length ? activeIndex : 0;
  const activeItem = safeItems[safeActiveIndex];

  return (
    <section
      className={`relative isolate bg-gradient-to-b from-white via-[#f4f6fb] to-white text-foreground py-16 md:py-32 ${className}`}
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          {caption ? (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/50 sm:tracking-[0.4em]">{caption}</p>
          ) : null}
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {title} {highlight ? <span className="font-semibold text-black block md:inline">{highlight}</span> : null}
          </h2>
          {subtitle ? <p className="mt-4 text-sm md:text-base text-black/70">{subtitle}</p> : null}
        </div>

        <div className="mt-10 flex flex-col items-center gap-8 sm:mt-14">
          <div className="flex w-full max-w-4xl items-center gap-6">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous testimonial"
              className="hidden size-12 items-center justify-center rounded-full border border-black/20 text-black transition hover:bg-black/5 md:inline-flex"
            >
              ‹
            </button>
            <Card t={activeItem} />
            <button
              type="button"
              onClick={goNext}
              aria-label="Next testimonial"
              className="hidden size-12 items-center justify-center rounded-full border border-black/20 text-black transition hover:bg-black/5 md:inline-flex"
            >
              ›
            </button>
          </div>

          <div className="flex items-center gap-2">
            {safeItems.map((item, index) => (
              <button
                key={getTestimonialKey(item)}
                type="button"
                aria-label={`Show testimonial ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`size-2.5 rounded-full transition ${index === safeActiveIndex ? "bg-[#0b0c10]" : "bg-black/20 hover:bg-black/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
