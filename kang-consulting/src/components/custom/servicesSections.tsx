import Image from "next/image";
import { FadeIn } from "@/components/custom/animated";
import type { Dictionary } from "@/i18n/dictionaries";

type Props = {
  content: Dictionary["services"];
};

type ServiceBullet = Dictionary["services"]["college"]["bullets"][number];

const getBulletKey = (bullet: ServiceBullet) =>
  bullet.map((segment) => (typeof segment === "string" ? segment : segment.text)).join("");

function BulletContent({ bullet }: { bullet: ServiceBullet }) {
  return (
    <>
      {bullet.map((segment) =>
        typeof segment === "string" ? segment : <strong key={segment.text}>{segment.text}</strong>,
      )}
    </>
  );
}

export default function ServicesSections({ content }: Props) {
  return (
    <div>
      {/* Section 1: College Counseling (Image Right) */}
      <section className="relative isolate bg-transparent px-4 py-14 text-black sm:px-6 sm:py-20">
        <div
          className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-[var(--radius-md)] border border-[#dcd7d0] bg-white shadow-[var(--shadow-soft)] md:flex-row"
        >
          {/* Text */}
          <div className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 md:w-1/2 md:px-10 md:py-12">
            <div className="w-full max-w-xl">
              <FadeIn>
                <h1 className="text-left text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{content.college.title}</h1>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="mt-5 rounded-[var(--radius-sm)] border border-[#e6e0da] bg-[#f9f7f4] p-5">
                  <ul className="list-disc space-y-3 pl-5 text-base text-black/80 md:text-lg">
                    {content.college.bullets.map((bullet) => (
                      <li key={getBulletKey(bullet)}>
                        <BulletContent bullet={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
          {/* Image */}
          <FadeIn className="relative h-64 bg-[#0b0c10] md:h-auto md:w-1/2" y={0}>
            <Image
              src="/images/college.jpg"
              alt="College counseling photo"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </FadeIn>
        </div>
      </section>

      {/* Section 2: Research Mentorship (Image Left) */}
      <section className="relative isolate bg-transparent px-4 pb-14 text-black sm:px-6 sm:pb-20">
        <div
          className="mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-[var(--radius-md)] border border-[#dcd7d0] bg-white shadow-[var(--shadow-soft)] md:flex-row"
        >
          {/* Image */}
          <FadeIn className="relative order-last h-64 bg-[#0b0c10] md:order-first md:h-auto md:w-1/2" y={0}>
            <Image
              src="/images/isef image.jpg"
              alt="ISEF competition photo"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </FadeIn>
          {/* Text */}
          <div className="flex items-center justify-center px-5 py-8 sm:px-8 sm:py-10 md:w-1/2 md:px-10 md:py-12">
            <div className="w-full max-w-xl">
              <FadeIn>
                <h2 className="text-left text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">{content.research.title}</h2>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="mt-5 rounded-[var(--radius-sm)] border border-[#e6e0da] bg-[#f9f7f4] p-5">
                  <ul className="list-disc space-y-3 pl-5 text-base text-black/80 md:text-lg">
                    {content.research.bullets.map((bullet) => (
                      <li key={getBulletKey(bullet)}>
                        <BulletContent bullet={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
