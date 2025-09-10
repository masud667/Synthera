import { Inter } from "next/font/google";
import "./globals.css";
import ClientProviders from "./components/clientProvider/ClientProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Synthera – Upgrade Your Wardrobe",
  description:
    "Upgrade your style effortlessly with Synthera's personalized AI fashion recommendations.",
  keywords: [
    "AI fashion",
    "personalized style",
    "Synthera",
    "wardrobe upgrade",
    "fashion trends",
  ],
  authors: [{ name: "Synthera Team" }],
  openGraph: {
    title: "Synthera – Upgrade Your Wardrobe",
    description:
      "Discover fashion powered by AI. Synthera helps you upgrade your wardrobe with personalized recommendations.",
    url: "https://Synthera.com",
    siteName: "Synthera",
    images: [
      {
        url: "https://Synthera.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Synthera Fashion Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
