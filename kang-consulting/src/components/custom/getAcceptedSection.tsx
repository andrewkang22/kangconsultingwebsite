"use client";

import Image from "next/image";

type AcceptanceLetter = {
  school: string;
  src: string;
};

const acceptanceLetters: AcceptanceLetter[] = [
  { school: "Stanford University", src: "/acceptance_letters/stanford.jpg" },
  { school: "University of Pennsylvania", src: "/acceptance_letters/penn.jpg" },
  { school: "Yale University", src: "/acceptance_letters/yale.jpg" },
  { school: "University of Southern California", src: "/acceptance_letters/usc.png" },
  { school: "Washington University in St. Louis", src: "/acceptance_letters/washu.png" },
];

type LetterCardProps = {
  letter: AcceptanceLetter;
  className?: string;
  priority?: boolean;
};

function LetterCard({ letter, className = "", priority = false }: LetterCardProps) {
  return (
    <figure className={`flex flex-col items-center ${className}`}>
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] border border-black/10 bg-white shadow-[0_15px_40px_rgba(15,15,15,0.12)]">
        <Image
          src={letter.src}
          alt={`${letter.school} acceptance letter`}
          fill
          className="object-contain"
          sizes="(min-width: 1536px) 260px, (min-width: 1280px) 220px, (min-width: 768px) 45vw, 70vw"
          priority={priority}
          unoptimized
        />
      </div>
      <figcaption className="mt-4 text-base font-semibold text-black/70">{letter.school}</figcaption>
    </figure>
  );
}

type GetAcceptedSectionProps = {
  caption: string;
  heading: string;
};

export default function GetAcceptedSection({ caption, heading }: GetAcceptedSectionProps) {
  return (
    <section aria-label="Our results" className="bg-white text-black border-y border-black/10 py-20 md:py-32">
      <div className="mx-auto w-full max-w-[2200px] px-4 sm:px-6 lg:px-10">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-black/50 sm:text-sm sm:tracking-[0.4em]">{caption}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{heading}</h2>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="acceptance-marquee" aria-label="College acceptance letters carousel">
            <div className="acceptance-marquee__track">
              <div className="acceptance-marquee__group">
                {acceptanceLetters.map((letter, index) => (
                  <LetterCard
                    key={letter.school}
                    letter={letter}
                    className="w-[210px] shrink-0 sm:w-[240px] md:w-[260px] lg:w-[300px]"
                    priority={index === 0}
                  />
                ))}
              </div>
              <div className="acceptance-marquee__group" aria-hidden="true">
                {acceptanceLetters.map((letter) => (
                  <LetterCard
                    key={`${letter.school}-loop`}
                    letter={letter}
                    className="w-[210px] shrink-0 sm:w-[240px] md:w-[260px] lg:w-[300px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
