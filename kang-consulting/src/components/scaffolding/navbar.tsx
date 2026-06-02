"use client";

import Image from "next/image";
import { m } from "framer-motion";
import FancyLink from "../custom/fancyLink";
import Link from "next/link";
import Button from "../custom/button";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  labels: {
    home: string;
    about: string;
    services: string;
    getStarted: string;
  };
}

export default function Navbar({ labels }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  const navigation = [
    { href: "/", label: labels.home },
    { href: "/about", label: labels.about },
    { href: "/services", label: labels.services },
  ];

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const openMenu = () => {
    const mobileMenu = mobileMenuRef.current;

    if (mobileMenu && !mobileMenu.open) {
      mobileMenu.showModal();
    }

    setMenuOpen(true);
  };

  const closeMenu = () => {
    const mobileMenu = mobileMenuRef.current;

    if (mobileMenu?.open) {
      mobileMenu.close();
    }

    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-[120] border-b border-[#e0dbd5] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-4 sm:px-5 lg:h-20 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <m.span
              className="relative flex size-11 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] border border-black/80 bg-white lg:size-12"
              whileHover={{ rotate: -2 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <Image src="/branding/icon.svg" alt="Kang Consulting" width={36} height={36} priority className="size-8 lg:size-9" />
            </m.span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/70 transition-colors duration-200 group-hover:text-black sm:tracking-[0.38em] lg:hidden">
              KC
            </span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.45em] text-black/60 transition-colors duration-200 group-hover:text-black lg:block">
              Kang Consulting
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-12">
            {navigation.map((item) => (
              <FancyLink key={item.href} href={item.href} className="text-black/60 hover:text-black">
                {item.label}
              </FancyLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Button href="/contact" variant="solid" className="shadow-[6px_6px_0_#000000]">
              {labels.getStarted}
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-black/80 bg-white text-black transition-colors duration-200 hover:bg-[#0b0c10] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-black/10 lg:hidden"
            aria-label="Open navigation menu"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            onClick={openMenu}
          >
            <svg aria-hidden="true" width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M1 8H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M1 15H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <dialog
        ref={mobileMenuRef}
        id="mobile-navigation"
        className="fixed inset-0 z-[150] m-0 min-h-dvh w-dvw max-h-none max-w-none overflow-y-auto border-0 bg-[#f5f4f1] p-0 text-black lg:hidden"
        aria-label="Mobile navigation"
        onClose={() => setMenuOpen(false)}
      >
        <div className="flex min-h-dvh flex-col">
          <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-black/10 bg-white px-4">
            <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
              <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] border border-black/80 bg-white">
                <Image src="/branding/icon.svg" alt="Kang Consulting" width={36} height={36} className="size-8" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/70">
                KC
              </span>
            </Link>

            <button
              type="button"
              aria-label="Close navigation menu"
              className="inline-flex size-11 items-center justify-center rounded-[var(--radius-sm)] border border-black/80 bg-[#0b0c10] text-white transition-colors duration-200 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-4 focus-visible:ring-black/10"
              onClick={closeMenu}
            >
              <svg aria-hidden="true" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L15 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M15 4L4 15" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col px-4 py-8" aria-label="Mobile navigation">
            <div className="border-y border-black/10">
              {navigation.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex min-h-[4.5rem] items-center justify-between border-b border-black/10 py-5 text-left last:border-b-0"
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="font-fancy text-3xl font-semibold leading-none text-[#111827]">
                      {item.label}
                    </span>
                    <span
                      className={`inline-flex size-10 items-center justify-center rounded-full border text-sm transition-colors duration-200 ${
                        isActive
                          ? "border-black bg-[#0b0c10] text-white"
                          : "border-black/20 bg-white text-black group-hover:border-black group-hover:bg-[#0b0c10] group-hover:text-white"
                      }`}
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 3L10 8L5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-auto pt-8">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-black/50">
                Complimentary consultation
              </p>
              <Button href="/contact" variant="solid" className="w-full shadow-[7px_7px_0_#000000]" onClick={closeMenu}>
                {labels.getStarted}
              </Button>
            </div>
          </nav>
        </div>
      </dialog>
    </>
  );
}
