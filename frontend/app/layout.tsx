import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "@/components/animation/SmoothScroll";
import { Footer } from "@/components/layout/Footer";
import { ShapeDefs } from "@/components/ui/StarImage";
import { RaysoCta } from "@/components/layout/RaysoCta";
import { getSiteSettings } from "@/(core)/fetch/siteSettings";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Content refreshes from Sanity at most once a minute
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const name = settings?.siteName ?? "Spoty";
  return {
    title: { default: name, template: `%s · ${name}` },
    description: settings?.description,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SmoothScroll />
        <ShapeDefs />
        {children}
        <Footer />
        <RaysoCta />
      </body>
    </html>
  );
}
