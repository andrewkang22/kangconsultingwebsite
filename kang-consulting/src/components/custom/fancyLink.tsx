"use client";

import { m } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface FancyLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function FancyLink({ href, children, className = "", onClick }: FancyLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      className={`relative inline-flex items-center justify-center text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <m.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute bottom-0 left-0 h-[2px] w-full origin-center bg-[#0b0c10]"
      />
    </Link>
  );
}
