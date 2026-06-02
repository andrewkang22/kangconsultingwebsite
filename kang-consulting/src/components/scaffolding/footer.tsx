import FancyLink from "../custom/fancyLink";
import Image from "next/image";
interface FooterProps {
  labels: {
    copyright: string; // template with {year}
    rights: string;
    home?: string;
    about?: string;
    services?: string;
    contact?: string;
  };
}

export default function Footer({ labels }: FooterProps) {
  const year = new Date().getFullYear().toString();
  const copyright = labels.copyright.replace("{year}", year);
  return (
    <footer className="w-full border-t border-[#e0dbd5] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.18em] text-black/70">
          <FancyLink href="/">{labels.home ?? "Home"}</FancyLink>
          <FancyLink href="/about">{labels.about ?? "About"}</FancyLink>
          <FancyLink href="/services">{labels.services ?? "Services"}</FancyLink>
          <FancyLink href="/contact">{labels.contact ?? "Contact"}</FancyLink>
        </div>

        <div className="text-sm text-black/70">
          {copyright} {labels.rights}
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 pb-10">
        <div className="relative flex items-center overflow-visible">
          <Image
            src="/branding/wordmark.svg"
            alt="Kang Consulting wordmark"
            sizes="60vw"
            width={1000}
            height={140}
            className="w-full"
            priority
          />
          <Image
            src="/branding/icon.svg"
            alt="Kang Consulting monogram"
            width={200}
            height={200}
            className="absolute -right-8 top-1/2 hidden size-32 -translate-y-1/2 md:block"
            priority
          />
        </div>
      </div>
    </footer>
  );
}
