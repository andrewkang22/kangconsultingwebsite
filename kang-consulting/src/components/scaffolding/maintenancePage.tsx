import Image from "next/image";
import {
  MAINTENANCE_DESCRIPTION,
  MAINTENANCE_HEADING,
} from "@/lib/siteStatus";

export default function MaintenancePage() {
  return (
    <section className="flex min-h-dvh items-center bg-[#f5f4f1] px-5 py-12 text-[#0b0b0b]">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <div className="relative flex size-16 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] border border-black/80 bg-white shadow-[8px_8px_0_rgba(15,23,42,0.12)]">
          <Image
            src="/branding/icon.svg"
            alt="Kang Consulting"
            width={48}
            height={48}
            priority
            className="size-11"
          />
        </div>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.38em] text-black/55">
          Kang Consulting
        </p>
        <h1 className="mt-5 max-w-2xl font-fancy text-4xl font-semibold leading-tight text-[#111827] sm:text-6xl">
          {MAINTENANCE_HEADING}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#374151] sm:text-lg">
          {MAINTENANCE_DESCRIPTION}
        </p>
      </div>
    </section>
  );
}
