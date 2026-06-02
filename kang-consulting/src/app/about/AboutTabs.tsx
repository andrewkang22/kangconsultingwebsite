"use client";

import { useState } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";

type Person = {
  name: string;
  role: string;
  bio?: string; // Optional bio
  image?: string;
  stats?: string[];
};

type AboutTabsProps = {
  heroTitle: string;
  heroBody: string;
  founders: Person[];
  team: Person[];
  globalChapters: Person[];
};

type AboutTabId = "founders" | "team" | "globalChapters";

const ABOUT_TABS = [
  { id: "founders", label: "Founders" },
  { id: "team", label: "The Team" },
  { id: "globalChapters", label: "Global Chapters" },
] as const;

export default function AboutTabs({ heroTitle, heroBody, founders, team, globalChapters }: AboutTabsProps) {
  const [activeTab, setActiveTab] = useState<AboutTabId>("founders");

  const data: Record<AboutTabId, Person[]> = {
    founders,
    team,
    globalChapters,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:py-32">
      {/* Hero Section */}
      <div className="mx-auto mb-12 max-w-3xl px-2 text-center sm:mb-20 sm:px-4">
        <h1 className="mb-6 font-fancy text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:mb-8 md:text-6xl lg:text-7xl">
          {heroTitle}
        </h1>
        <div className="whitespace-pre-wrap text-base leading-relaxed text-slate-600 sm:text-lg md:text-xl">
          {heroBody}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12 flex flex-wrap justify-center gap-3 sm:mb-16 sm:gap-4">
        {ABOUT_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`relative rounded-full px-5 py-3 text-sm font-medium transition-all duration-300 sm:px-8 sm:text-lg ${activeTab === tab.id
              ? "text-white shadow-lg shadow-slate-900/10"
              : "text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200"
              }`}
          >
            {activeTab === tab.id && (
              <m.div
                layoutId="activeTab"
                className="absolute inset-0 bg-slate-900 rounded-full"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="min-h-[420px] sm:min-h-[600px]">
        <AnimatePresence mode="wait">
          <m.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-6 sm:gap-8"
          >
            {data[activeTab].map((person) => (
              <div
                key={person.name}
                className="group relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl md:rounded-3xl"
              >
                {/* Image Area */}
                <div className="relative w-full aspect-[4/5] bg-slate-100 overflow-hidden">
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-slate-100 text-slate-400">
                      <span className="text-6xl font-fancy font-light opacity-50">
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Content Area */}
                <div className="flex flex-grow flex-col p-5 sm:p-6 md:p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-slate-900 font-fancy">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold text-slate-600 mt-1">
                      {person.role}
                    </p>
                  </div>

                  {person.stats && person.stats.length > 0 && (
                    <div className="mb-6">
                      <ul className="space-y-2">
                        {person.stats.map((stat) => (
                          <li key={stat} className="text-sm text-slate-700 flex items-start gap-2">
                            <span className="mt-1.5 size-1.5 rounded-full bg-slate-900 flex-shrink-0" />
                            <span>{stat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {person.bio && (
                    <p className="text-slate-600 leading-relaxed flex-grow whitespace-pre-wrap">
                      {person.bio}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
