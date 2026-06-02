import Button from "@/components/custom/button";

type PricingTierProps = {
  title: string;
  description: string;
  price: string;
  features: string[];
  ctaHref: string;
  ctaLabel?: string;
  badge?: string;
};

export default function PricingTier({
  title,
  description,
  price,
  features,
  ctaHref,
  ctaLabel = "REQUEST A FREE CONSULTATION",
  badge,
}: PricingTierProps) {
  return (
    <div className="w-full rounded-[var(--radius-md)] border border-[#dcd7d0] bg-white p-6 shadow-[var(--shadow-soft)] md:p-8">
      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        {/* Left: Title and description */}
        <div className="md:w-2/5">
          <div className="flex items-center gap-3">
            <h3 className="text-2xl md:text-3xl font-semibold text-[#111111]">{title}</h3>
            {badge ? (
              <span className="hidden md:inline-block rounded-full border border-black/20 px-3 py-1 text-xs font-medium">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="mt-3 text-sm md:text-base text-black/80">{description}</p>
        </div>

        {/* Middle: Features */}
        <div className="mt-6 md:mt-0 md:w-2/5">
          <ul className="grid grid-cols-1 gap-2 text-sm md:text-base text-black/80">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-1 size-[6px] rounded-[var(--radius-xs)] bg-black/70" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Price and CTA */}
        <div className="mt-6 md:mt-0 md:w-1/5 md:text-right">
          <div className="text-3xl md:text-4xl font-semibold text-[#111111]">{price}</div>
          <div className="mt-4 inline-block">
            <Button href={ctaHref} variant="solid">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
      {badge ? (
        <div className="mt-3 md:hidden">
          <span className="rounded-full border border-black/20 px-2.5 py-1 text-xs font-medium">
            {badge}
          </span>
        </div>
      ) : null}
    </div>
  );
}
