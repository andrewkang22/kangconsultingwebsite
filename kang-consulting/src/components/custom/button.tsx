import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "outline" | "solid";
  onClick?: () => void;
}

const baseClasses =
  "inline-flex max-w-full items-center justify-center rounded-[var(--radius-sm)] border border-black/80 px-5 py-2.5 text-center text-sm font-semibold leading-tight tracking-[0.12em] uppercase transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black sm:tracking-[0.18em]";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  outline: "bg-transparent text-black hover:bg-[#0b0c10] hover:text-white",
  solid: "bg-[#0b0c10] text-white hover:bg-[#111827] hover:border-[#0b0c10]",
};

export default function Button({ children, href, className = "", variant = "outline", onClick }: ButtonProps) {
  return (
    <Link href={href} onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </Link>
  );
}
