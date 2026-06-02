import type { Metadata } from "next";
import PricingTier from "@/components/custom/pricingTier";
import Button from "@/components/custom/button";
import PrestigeCallout from "@/components/custom/prestigeCallout";

export const metadata: Metadata = {
  title: "College Consulting Pricing",
  description:
    "Review Kang Consulting college admissions support options and request a private consultation for personalized guidance.",
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
  pageTitle: "College Consulting - Pricing",
  tiers: [
    /*
    {
      title: "Core",
      description:
        "Work directly with Andrew Kang in recurring meetings for personalized help in research and/or college counseling with the support of other trained mentors handpicked by Daniel Kang.",
      price: "$4,475",
      features: [
        "Unlimited weekly sessions",
        "Led personally by Andrew Kang with select mentors",
        "Mentorship from Kang Consulting's ISEF Winners, HYPSM admits, and T10 students",
        "Application timeline + extracurricular roadmapping",
        "Essay editing for all schools",
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
    eyebrow: "Discreet partnership",
    description:
      "We guarantee Top 30 admissions or your money back. Because that promise is backed by a dedicated guarantor, Prestige engagements are priced well above our Core and Elite tiers. Contact us privately for scope, capacity, and investment.",
    footnote: "Invitation-only - Contact for briefing",
    ctaLabel: "Contact for details",
  },
  footerCta: "Contact us for more offers",
};

export default function CollegePricingPage() {
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
