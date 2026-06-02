"use client";

import { useState } from "react";

type Track = "college" | "research";

const iconStroke = "currentColor";

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" className="size-10 text-[#0f172a]" fill="none" stroke={iconStroke} strokeWidth="1.6">
    <path d="M3 21h18" strokeLinecap="round" />
    <path d="M6 21V9h12v12" />
    <path d="M9 21v-4h6v4" />
    <path d="M10 9V6h4v3" />
    <path d="M10 6h4l-2-3-2 3z" />
  </svg>
);

const FlaskIcon = () => (
  <svg viewBox="0 0 24 24" className="size-10 text-[#0f172a]" fill="none" stroke={iconStroke} strokeWidth="1.6">
    <path d="M10 2v6l-5 9a3 3 0 0 0 2.6 4.5h8.8A3 3 0 0 0 19 17L14 8V2" />
    <path d="M8 14h8" strokeLinecap="round" />
  </svg>
);

const trackOptions: Record<Track, { label: string; blurb: string }> = {
  college: {
    label: "College Admissions",
    blurb: "A focused roadmap that covers every piece of a competitive college application, from day-to-day academics to the stories that make students memorable.",
  },
  research: {
    label: "Research Mentorship",
    blurb: "Structure and mentorship for students building research portfolios—from lab readiness to communicating outcomes with polish and clarity.",
  },
};

type CardDefinition = {
  id: string;
  badge: string;
};

const cardLayouts: Record<Track, ReadonlyArray<CardDefinition>> = {
  college: [
    { id: "activities", badge: "EA" },
    { id: "letters", badge: "LR" },
    { id: "gpa", badge: "GP" },
    { id: "schoolList", badge: "SL" },
    { id: "essay", badge: "ER" },
    { id: "tutoring", badge: "PT" },
  ],
  research: [
    { id: "labConnections", badge: "LC" },
    { id: "mentoring", badge: "1M" },
    { id: "competition", badge: "CC" },
    { id: "isefSts", badge: "IP" },
    { id: "summerPrograms", badge: "RS" },
    { id: "stemSupplementals", badge: "SS" },
  ],
};

const cardCopy: Record<
  Track,
  Record<
    string,
    {
      title: string;
      description: string;
    }
  >
> = {
  college: {
    activities: {
      title: "Extracurricular Activities",
      description:
        "Prioritize the clubs, leadership positions, and passion projects that showcase genuine impact and align with your target schools' values.",
    },
    letters: {
      title: "Letters of Recommendation",
      description:
        "Plan early with teachers and mentors, build thoughtful brag sheets, and coach recommenders so they can advocate for you with specificity.",
    },
    gpa: {
      title: "HS GPA Management",
      description:
        "Quarter-by-quarter academic planning, accountability check-ins, and intervention tactics to keep transcripts spotless and rigorous.",
    },
    schoolList: {
      title: "School-List Curation",
      description:
        "Balanced target, reach, and foundation lists built around academic fit, vibe, financial considerations, and strategic deadline planning.",
    },
    essay: {
      title: "Essay Revisions",
      description:
        "Story-mining workshops, detailed line edits, and final polish so every essay—from Common App to supplements—sounds unmistakably like you.",
    },
    tutoring: {
      title: "Personal Tutoring (ACT/SAT)",
      description:
        "Diagnostics, milestone-driven study plans, and one-on-one instruction to keep standardized testing predictable and pressure-free.",
    },
  },
  research: {
    labConnections: {
      title: "Lab Connections",
      description:
        "High-touch outreach plans, PI introduction scripts, and onboarding guidance that place students in labs aligned with their interests.",
    },
    mentoring: {
      title: "1-to-1 Mentoring",
      description:
        "Weekly strategy sessions with PhD-level mentors covering experimental design, data analysis, and consistent accountability checkpoints.",
    },
    competition: {
      title: "Competition Coaching",
      description:
        "Rubric breakdowns, deliverable timelines, and rehearsal support for Regeneron STS, ISEF-affiliated fairs, and JSHS presentations.",
    },
    isefSts: {
      title: "ISEF/STS Playbooks",
      description:
        "Submission timelines, document templates, and narrative frameworks tailored to the specs of ISEF and Regeneron STS packets.",
    },
    summerPrograms: {
      title: "Research Summer Programs",
      description:
        "Program shortlists, application strategy, and essay editing for RSI, SIMR, Garcia, MITES, and other selective research intensives.",
    },
    stemSupplementals: {
      title: "STEM Supplementals",
      description:
        "Guidance on program-specific essays, research statements, and multimedia abstracts that translate lab results into compelling stories.",
    },
  },
};

export default function ConsultingOfferings() {
  const [track, setTrack] = useState<Track | null>(null);
  const activeCards = track
    ? cardLayouts[track].map((card) => ({
        ...card,
        ...cardCopy[track][card.id],
      }))
    : [];
  const selectedTrack = track ? trackOptions[track] : null;

  return (
    <section className="bg-[#f8f9fb] py-16 text-[#0f172a] md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7280] sm:tracking-[0.45em]">Choose your track</p>
          <h2 className="mt-4 text-3xl font-semibold text-[#111827] sm:text-4xl">College Admissions Consulting Services</h2>
          <p className="mt-4 text-base text-[#1f2937]/80 sm:text-lg max-w-3xl mx-auto">
            Tap a track to see what our team delivers for every engagement.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {(
            Object.entries(trackOptions) as Array<
              [Track, { label: string; blurb: string }]
            >
          ).map(([value, option]) => {
            const isActive = track === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setTrack(value)}
                className={`group flex flex-col rounded-[var(--radius-md)] border bg-white p-6 text-left shadow-[0_25px_70px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 sm:p-8 ${
                  isActive ? "border-[#0f172a] ring-4 ring-[#0f172a]/10" : "border-black/10"
                }`}
              >
                <div className="mb-6 inline-flex size-16 items-center justify-center rounded-full bg-[#0f172a]/5 text-[#0f172a]">
                  {value === "college" ? <BuildingIcon /> : <FlaskIcon />}
                </div>
                <h3 className="text-xl font-semibold text-[#0f172a]">{option.label}</h3>
                <p className="mt-4 text-sm text-[#1f2937]/80">{option.blurb}</p>
                <span className="mt-6 inline-flex items-center text-sm font-semibold uppercase tracking-[0.18em] text-[#0f172a] sm:tracking-[0.35em]">
                  {isActive ? "Selected" : "View playbook"}
                  <span className="ml-3 text-base">↗</span>
                </span>
              </button>
            );
          })}
        </div>

        {track && selectedTrack && (
          <div className="mt-12 rounded-[var(--radius-md)] border border-black/5 bg-white p-5 shadow-[0_35px_90px_rgba(15,23,42,0.08)] sm:p-8 md:mt-16">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#6b7280] sm:tracking-[0.5em]">Execution playbook</p>
              <h3 className="mt-4 text-2xl font-semibold text-[#111827] sm:text-3xl">6 things we do for {selectedTrack.label}</h3>
              <p className="mt-3 text-base text-[#1f2937]/80">{selectedTrack.blurb}</p>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeCards.map((card) => (
                <article
                  key={card.id}
                  className="flex h-full flex-col rounded-[var(--radius-md)] border border-black/10 bg-[#f8f9fb] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-sm font-semibold tracking-[0.2em] text-[#0f172a] shadow-[0_8px_20px_rgba(15,23,42,0.08)]">
                      {card.badge}
                    </span>
                    <h4 className="text-lg font-semibold text-[#0f172a]">{card.title}</h4>
                  </div>
                  <p className="mt-4 text-sm text-[#1f2937]/80 leading-relaxed">{card.description}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
