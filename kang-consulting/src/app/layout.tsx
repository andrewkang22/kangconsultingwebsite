import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "@/components/scaffolding/navbar";
import Footer from "@/components/scaffolding/footer";
import RouteKey from "@/components/scaffolding/routeKey";
import MotionProvider from "@/components/scaffolding/motionProvider";
import MaintenancePage from "@/components/scaffolding/maintenancePage";
import { getDictionary } from "@/i18n/dictionaries";
import {
  MAINTENANCE_DESCRIPTION,
  MAINTENANCE_TITLE,
  SITE_DOWN,
} from "@/lib/siteStatus";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.kangconsulting.org";
const liveTitle = "Kang Consulting | Elite College Consulting & Research Mentorship";
const liveDescription =
  "Personalized college admissions strategy, research mentorship, and competition prep from the Kang brothers and their award-winning team.";
const defaultTitle = SITE_DOWN ? MAINTENANCE_TITLE : liveTitle;
const defaultDescription = SITE_DOWN ? MAINTENANCE_DESCRIPTION : liveDescription;
const contactEmail = "support@kangconsulting.org";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Kang Consulting",
  url: siteUrl,
  logo: `${siteUrl}/branding/wordmark.svg`,
  description: liveDescription,
  email: contactEmail,
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "student recruitment",
      email: contactEmail,
      availableLanguage: ["English"],
    },
  ],
  sameAs: [siteUrl],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Kang Consulting",
  },
  description: defaultDescription,
  keywords: SITE_DOWN
    ? ["Kang Consulting"]
    : [
        "college consulting",
        "college admissions help",
        "ISEF mentorship",
        "research mentorship",
        "Ivy League admissions",
        "Kang Consulting",
        "Daniel Kang",
        "Andrew Kang",
      ],
  category: "education",
  authors: [{ name: "Daniel & Andrew Kang", url: siteUrl }],
  creator: "Kang Consulting",
  publisher: "Kang Consulting",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: "Kang Consulting",
    locale: "en_US",
    images: SITE_DOWN
      ? []
      : [
          {
            url: `${siteUrl}/images/thumbnail.jpg`,
            width: 1200,
            height: 630,
            alt: "Kang Consulting acceptance letter collage",
          },
        ],
  },
  twitter: {
    card: SITE_DOWN ? "summary" : "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: SITE_DOWN ? [] : [`${siteUrl}/images/thumbnail.jpg`],
  },
  robots: {
    index: !SITE_DOWN,
    follow: !SITE_DOWN,
    nocache: SITE_DOWN,
    googleBot: {
      index: !SITE_DOWN,
      follow: !SITE_DOWN,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (SITE_DOWN) {
    return (
      <html lang="en">
        <body
          suppressHydrationWarning
          className="antialiased flex flex-col min-h-screen scroll"
        >
          <MotionProvider>
            <main className="flex-1">
              <MaintenancePage />
            </main>
          </MotionProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    );
  }

  const dict = await getDictionary();

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="antialiased flex flex-col min-h-screen scroll"
      >
        <MotionProvider>
          <Navbar labels={dict.common.nav} />
          <main className="flex-1">
            <RouteKey>{children}</RouteKey>
          </main>
          <Footer
            labels={{
              ...dict.common.footer,
              home: dict.common.nav.home,
              about: dict.common.nav.about,
              services: dict.common.nav.services,
              contact: dict.common.nav.getStarted,
            }}
          />
        </MotionProvider>
        <script type="application/ld+json">
          {JSON.stringify(organizationJsonLd)}
        </script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
