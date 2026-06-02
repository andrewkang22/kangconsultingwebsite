import type { Metadata } from "next";
import MaintenancePage from "@/components/scaffolding/maintenancePage";
import {
  MAINTENANCE_DESCRIPTION,
  MAINTENANCE_TITLE,
} from "@/lib/siteStatus";

export const metadata: Metadata = {
  title: MAINTENANCE_TITLE,
  description: MAINTENANCE_DESCRIPTION,
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function DownPage() {
  return <MaintenancePage />;
}
