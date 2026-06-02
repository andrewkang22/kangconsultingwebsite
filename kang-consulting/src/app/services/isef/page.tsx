import type { Metadata } from "next";
import PricingTier from "@/components/custom/pricingTier";
import Button from "@/components/custom/button";
import PrestigeCallout from "@/components/custom/prestigeCallout";

export const metadata: Metadata = {
  title: "Research Mentorship Pricing",
  description:
    "Review Kang Consulting research mentorship options for project development, competition coaching, and private STEM guidance.",
};

type TierCopy = {
  title: string;
  description: string;
  price: string;
  features: string[];
  badge?: string;
  ctaLabel: string;
};

type PageCopy = {
  pageTitle: string;
  tiers: TierCopy[];
  prestige: {
    heading: string;
    eyebrow: string;
    description: string;
    footnote: string;
    ctaLabel: string;
  };
  footerCta: string;
};

const copy: PageCopy = {
  pageTitle: "Research Mentorship - Pricing",
  tiers: [
    /*
    {
      title: "Core",
      description:
        "Work directly with Andrew Kang and other mentors in recurring meetings for personalized admissions and/or research advice.",
      price: "$4,475",
      features: [
        "Monthly sessions",
        "Led personally by Andrew Kang with select mentors",
        "Aiding in project creation for research",
        "General poster guidance and milestone tracking",
        "To access both College Consulting and Research Mentorship, purchase this tier twice.*",
      ],
      ctaLabel: "REQUEST A FREE CONSULTATION",
    },
    */
    {
      title: "Elite",
      description:
        "Work directly with Daniel Kang in weekly meetings with full access to Andrew Kang for complete support and comprehensive guidance for research and/or college counseling.",
      price: "$8,495",
      features: [
        "Unlimited weekly sessions",
        "Led personally by Daniel Kang and Andrew Kang as your primary advisors",
        "Support from elite mentors selected by the Stanford brothers",
        "Personalized strategy and hands-on support for a full year",
        "Research project incubation & competition coaching by ISEF winners",
        "Capped cohort capacity to preserve quality of support",
        "To access both College Consulting and Research Mentorship, purchase this tier twice.*",
      ],
      badge: "Most Popular Choice",
      ctaLabel: "REQUEST A FREE CONSULTATION",
    },
  ],
  prestige: {
    heading: "Prestige - Research Mentorship & College Consulting",
    eyebrow: "Confidential track",
    description:
      "Prestige ISEF clients tap into stealth research opportunities, bespoke lab placements, and proprietary coaching frameworks that are not shared publicly. Request a private briefing to learn if a seat is available.",
    footnote: "Extremely limited - Request full details",
    ctaLabel: "Contact for details",
  },
  footerCta: "Looking for something a little different? Contact us for additional options.",
};

export default function ISEFPricingPage() {
  const contactHref = "/contact";
  const showContent = false;

  return showContent ? (
    <div className="mx-auto max-w-screen-2xl px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold mb-8">{copy.pageTitle}</h1>
      <div className="flex flex-col gap-8">
        {copy.tiers.map((tier) => (
          <PricingTier
            key={tier.title}
            title={tier.title}
            description={tier.description}
            price={tier.price}
            features={tier.features}
            ctaHref={contactHref}
            ctaLabel={tier.ctaLabel}
            badge={tier.badge}
          />
        ))}
      </div>

      <PrestigeCallout
        heading={copy.prestige.heading}
        eyebrow={copy.prestige.eyebrow}
        description={copy.prestige.description}
        ctaHref={contactHref}
        wrapperClassName="pt-8"
        footnote={copy.prestige.footnote}
        ctaLabel={copy.prestige.ctaLabel}
      />

      <div className="mt-12 text-center">
        <div className="inline-block">
          <Button href={contactHref}>{copy.footerCta}</Button>
        </div>
      </div>
    </div>
  ) : null;
}
