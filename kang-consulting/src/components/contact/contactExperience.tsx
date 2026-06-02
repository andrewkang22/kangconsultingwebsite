"use client";

import ContactForm from "@/components/contact/contactForm";
import type { Dictionary } from "@/i18n/dictionaries";

interface ContactExperienceProps {
  copy: Dictionary["contact"];
}

export default function ContactExperience({ copy }: ContactExperienceProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
      <div className="space-y-8 sm:space-y-12">
        <header className="space-y-5">
          <h1 className="text-3xl font-semibold tracking-tight text-[#0f0f0f] sm:text-4xl md:text-5xl">{copy.hero.title}</h1>
          <p className="max-w-2xl text-base leading-relaxed text-gray-700 sm:text-lg md:text-xl">{copy.hero.description}</p>
        </header>

        <ContactForm copy={copy.form} nextSteps={copy.nextSteps} />
      </div>
    </section>
  );
}
