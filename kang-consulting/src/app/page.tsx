import type { Metadata } from "next";
import Image from "next/image";
import { preload } from "react-dom";
import Button from "@/components/custom/button";
import LogoCarousel from "@/components/custom/logoCarousel";
import BackgroundVideo from "@/components/custom/backgroundVideo";
import GetAcceptedSection from "@/components/custom/getAcceptedSection";
import Testimonials from "@/components/custom/testimonials";
import ConsultingOfferings from "@/components/custom/consultingOfferings";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Elite College Admissions Consulting",
  description:
    "College admissions strategy, research mentorship, application planning, and competition prep from Kang Consulting.",
};

export default async function Home() {
  preload("/hero-bg-640-poster.jpg", { as: "image", type: "image/jpeg", fetchPriority: "high" });

  const dict = await getDictionary();
  const [heroPrimary, ...heroRemainder] = dict.home.title.split(".");
  const heroSecondary = heroRemainder.join(".").trim();
  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-stretch overflow-hidden bg-[#0b0c10] shadow-2xl z-100 md:min-h-[calc(100vh-4rem)]" aria-label="Hero">
        {/* Background video + overlay */}
        {/* Background video with decelerating playback */}
        <BackgroundVideo src="/hero-bg-640.mp4" poster="/hero-bg-640-poster.jpg" />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <div className="absolute inset-0 mx-auto max-w-screen-2xl">
          {/* Decorative corners */}
          <div className="pointer-events-none absolute left-10 top-10 hidden md:block">
            <div className="h-1 w-56 bg-white/90" />
            <div className="h-56 w-1 bg-white/90" />
          </div>
          <div className="pointer-events-none absolute right-10 bottom-10 hidden md:block">
            <div className="h-56 w-1 bg-white/90 ml-auto" />
            <div className="h-1 w-56 bg-white/90" />
          </div>

          {/* Content: centered on small screens, top-left on sm+ */}
          <div className="flex h-full px-5 pb-44 pt-14 text-center max-md:items-start max-md:justify-center sm:px-6 md:absolute md:left-12 md:right-6 md:top-16 md:block md:px-0 md:pb-0 md:pt-0 md:text-left lg:left-20 lg:top-20">
            <div className="max-w-3xl mx-auto md:mx-0 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
              <h1 className="font-fancy text-4xl tracking-tight sm:text-[2.8rem] md:text-[3.4rem] lg:text-[4.3rem] xl:text-[4.6rem] xl:whitespace-nowrap">
                <span className="font-semibold">{heroPrimary.trim()}</span>
                {heroSecondary ? `. ${heroSecondary}` : ""}
              </h1>
              <p className="mx-auto mt-5 max-w-[22rem] text-lg font-normal leading-snug text-white/85 sm:text-xl md:mx-0 md:mt-6 md:max-w-none md:text-[25px] lg:text-[30px] lg:whitespace-nowrap">
                {dict.home.subtitle}
              </p>
              <div className="mt-8 flex justify-center md:mt-10 md:justify-start">
                <Button
                  href="/contact"
                  variant="solid"
                  className="w-full max-w-[21rem] px-5 py-3 text-sm shadow-[8px_8px_0_#000000] sm:w-auto sm:px-6 md:text-base"
                >
                  {dict.home.cta}
                </Button>
              </div>
            </div>
          </div>

          {/* Logos: carousel centered on small screens, corner-hugged row on sm+ */}
          <div className="absolute inset-x-0 bottom-8 z-10 md:inset-auto md:bottom-20 md:right-12 md:left-auto lg:right-20">
            {/* Mobile carousel */}
            <div className="flex flex-col items-center md:hidden">
              <LogoCarousel items={dict.home.logos} />
              <p className="mt-3 px-4 text-center text-xs font-medium leading-snug text-white/90 sm:text-sm">
                {dict.home.logosCaption}
              </p>
            </div>
            {/* Desktop row */}
            <div className="hidden md:flex flex-col items-end text-white/95">
              <div className="flex items-center justify-end gap-10 lg:gap-14">
                {dict.home.logos.map((logo, index) => (
                  <div key={logo.label} className="relative flex flex-col items-center justify-center">
                    <Image
                      src={logo.image}
                      alt={logo.alt ?? `${logo.label} logo`}
                      width={200}
                      height={200}
                      className="h-20 lg:h-24 w-auto max-w-[150px] lg:max-w-[190px] object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
                      priority={index === 0}
                    />
                    <span className="sr-only">{logo.label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 max-w-none text-right text-sm md:text-base lg:text-lg text-white/85 leading-snug whitespace-nowrap">
                {dict.home.logosCaption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* New: Get Accepted section */}
      <GetAcceptedSection caption={dict.homeResults.caption} heading={dict.homeResults.heading} />

      <section className="bg-gradient-to-b from-[#f4f5f7] via-[#eef0f3] to-[#f4f5f7] text-[#0d1b2a] py-16 border-y border-black/5">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#4b5563] sm:tracking-[0.4em]">
                {dict.homeStats.eyebrow}
              </p>
              <div className="mt-6 text-2xl md:text-3xl font-medium">
                {dict.homeStats.statLabelPrefix}
              </div>
              <div className="mt-4 flex flex-col items-center gap-3 lg:items-start">
                <span className="text-6xl md:text-7xl font-extrabold tracking-tight text-[#111827]">
                  {dict.homeStats.statValue}
                </span>
                <span className="text-lg md:text-xl text-[#1f2937]">
                  {dict.homeStats.statLabelSuffix}
                </span>
              </div>
              <a
                href="https://www.usnews.com/best-colleges/rankings/national-universities"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex max-w-full items-center justify-center gap-2 text-sm font-semibold text-[#0b172b] underline decoration-dotted underline-offset-8 decoration-[#9ca3af] transition hover:text-[#111827] md:text-base lg:justify-start"
              >
                <span>{dict.homeStats.subtext}</span>
                <svg
                  className="h-4 w-4 md:h-5 md:w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </a>
            </div>

            <div className="relative">
              <div className="absolute -left-8 -top-6 size-20 rounded-full bg-[#f97316]/30 blur-2xl" aria-hidden="true" />
              <div className="absolute -right-10 -bottom-8 size-24 rounded-full bg-[#10b981]/30 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.18)] backdrop-blur-md md:rounded-3xl md:p-8">
                <div className="absolute -right-6 -top-6 size-16 rounded-full bg-[#111827]/10" aria-hidden="true" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280] sm:tracking-[0.4em]">
                    {dict.homeStats.mentorCta.eyebrow}
                  </p>
                  <h3 className="mt-5 text-2xl md:text-3xl font-semibold text-[#111827]">
                    {dict.homeStats.mentorCta.title}
                  </h3>
                  <p className="mt-4 text-base md:text-lg text-[#374151] leading-relaxed">
                    {dict.homeStats.mentorCta.body}
                  </p>
                  <div className="mt-6">
                    <Button
                      href="/about"
                      variant="solid"
                      className="shadow-[6px_6px_0_rgba(17,24,39,0.2)]"
                    >
                      {dict.homeStats.mentorCta.buttonLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConsultingOfferings />

      {/* Testimonials */}
      <Testimonials
        caption={dict.testimonials.caption}
        title={dict.testimonials.title}
        highlight={dict.testimonials.highlight}
        subtitle={dict.testimonials.subtitle}
        items={dict.testimonials.items}
      />

      <section className="relative isolate overflow-hidden border-y border-black/5 bg-[#f4f5f7] text-[#0d1b2a]">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-[#f4f5f7] to-[#e4e7ec]" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-14 sm:px-6 lg:min-h-[70vh] lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-14 lg:py-20">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6b7280] sm:tracking-[0.4em]">Complimentary consultation</p>
            <h3 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight text-[#111827] sm:text-5xl md:text-[48px]">
              {dict.homeCTA.title}
            </h3>
            <p className="mt-6 max-w-xl text-base md:text-xl text-[#1f2937]/80 leading-relaxed">
              {dict.homeCTA.body}
            </p>
            <div className="mt-8">
              <Button
                href="/contact"
                variant="solid"
                className="w-full border border-black/10 bg-[#111827] font-semibold text-white shadow-[10px_10px_0_rgba(15,23,42,0.2)] hover:bg-[#0b172b] sm:w-auto sm:min-w-[180px]"
              >
                {dict.homeCTA.ctaLabel}
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative aspect-[4/5] min-h-[300px] w-full max-w-md sm:min-h-[380px] lg:max-w-none lg:min-h-[460px]">
              <div className="absolute -left-4 top-10 size-12 rounded-full bg-[#f97316]/50 blur-3xl opacity-70" aria-hidden="true" />
              <div className="absolute -right-8 bottom-12 size-16 rounded-full bg-[#10b981]/50 blur-3xl opacity-70" aria-hidden="true" />
              <Image
                src="/images/consultation photo.png"
                alt="Consultation illustration"
                fill
                className="object-contain drop-shadow-[0_35px_70px_rgba(15,23,42,0.35)]"
                sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 90vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
