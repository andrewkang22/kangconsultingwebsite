"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function RouteKey({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // Key by pathname to force a remount on route changes within the same layout.
  return <div key={pathname}>{children}</div>;
}
