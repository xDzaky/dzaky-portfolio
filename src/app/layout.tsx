import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig, socialLinks } from "@/config/site";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { PageTransition } from "@/components/layout/page-transition";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { WebVitalsReporter } from "@/components/web-vitals-reporter";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const sameAs = socialLinks.filter((link) => link.platform !== "email").map((link) => link.href);

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.title,
  description: siteConfig.description,
  email: `mailto:${siteConfig.email}`,
  url: "https://dzaky.codes",
  sameAs,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location,
    addressCountry: "ID",
  },
  availability: siteConfig.availability,
  timeZone: siteConfig.timezone,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://dzaky.codes"),
  title: {
    default: `${siteConfig.name} · ${siteConfig.title}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} · ${siteConfig.title}`,
    description: siteConfig.description,
    url: "https://dzaky.codes",
    siteName: siteConfig.name,
    locale: "en_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · ${siteConfig.title}`,
    description: siteConfig.description,
  },
  authors: [{ name: siteConfig.name }],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}>
        <ThemeProvider>
          <SiteHeader />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <SiteFooter />
          <Analytics />
          <WebVitalsReporter />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
        </ThemeProvider>
      </body>
    </html>
  );
}
