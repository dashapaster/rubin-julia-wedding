import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = "Rubin Stebner & Julia Goldberg | Wedding Invitation";
const description =
  "A romantic wedding invitation website for Rubin Stebner and Julia Goldberg celebrating September 4–6 at Lake Maggiore, Italy.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: siteUrl,
    images: [
      {
        url: "/assets/italian-garden-3.png",
        width: 1200,
        height: 1280,
        alt: "Italian garden wedding illustration",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/assets/italian-garden-3.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
