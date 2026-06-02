import type { Metadata } from "next";
import ServicesSections from "@/components/custom/servicesSections";
import { getDictionary } from "@/i18n/dictionaries";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Kang Consulting college admissions strategy, research mentorship, essay support, and competition coaching.",
};

export default async function ServicesPage() {
  const dict = await getDictionary();
  return <ServicesSections content={dict.services} />;
}
