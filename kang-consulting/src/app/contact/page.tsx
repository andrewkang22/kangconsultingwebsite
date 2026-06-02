import type { Metadata } from "next";
import { getDictionary } from "@/i18n/dictionaries";
import ContactExperience from "@/components/contact/contactExperience";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a complimentary Kang Consulting consultation for college admissions guidance or research mentorship.",
};

export default async function ContactPage() {
  const dict = await getDictionary();

  return (
    <ContactExperience copy={dict.contact} />
  );
}
