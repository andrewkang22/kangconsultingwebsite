import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import AboutTabs from "./AboutTabs";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the Kang Consulting founders, mentors, and global chapters guiding students through admissions and research mentorship.",
};

export default async function AboutPage() {
  const dict = await getDictionary();

  // Map dictionary data to the format expected by AboutTabs
  const founders = [
    {
      name: dict.about.daniel.name,
      role: "Co-Founder & Lead Mentor (Stanford '26)",
      bio: dict.about.daniel.paragraphs.join("\n\n"),
      image: "/about/daniel_headshot_cropped.png",
      stats: dict.about.daniel.highlights,
    },
    {
      name: dict.about.andrew.name,
      role: "Co-Founder & Mentor (Stanford '29)",
      bio: dict.about.andrew.paragraphs.join("\n\n"),
      image: "/about/andrew_headshot_upscaled.png",
      stats: dict.about.andrew.highlights,
    },
  ];

  return (
    <section className="bg-[#f5f4f1] min-h-screen">
      <AboutTabs
        heroTitle={dict.about.heroTitle}
        heroBody={dict.about.heroBody}
        founders={founders}
        team={dict.about.team}
        globalChapters={dict.about.globalChapters}
      />
    </section>
  );
}
