"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LogoItem {
  label: string;
  image: string;
  alt?: string;
}

interface LogoCarouselProps {
  items: LogoItem[];
  intervalMs?: number;
  className?: string;
}

export default function LogoCarousel({ items, intervalMs = 2200, className = "" }: LogoCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items?.length) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items, intervalMs]);

  if (!items?.length) return null;

  return (
    <div className={`w-72 overflow-hidden [contain:paint] sm:w-80 ${className}`} aria-label="College logos carousel">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((logo, i) => (
          <div key={logo.label ?? i} className="min-w-full flex flex-col items-center justify-center gap-3">
            <Image
              src={logo.image}
              alt={logo.alt ?? `${logo.label} logo`}
              width={180}
              height={180}
              className="h-20 w-auto max-w-[130px] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
              priority={i === 0}
            />
            <span className="sr-only">{logo.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
