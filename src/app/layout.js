import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar";
import SyntheraChatbot from "./components/chatbot/SyntheraChatbot";
import NextAuthProvider from "@/providers/NextAuthProvider";

import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        cz-shortcut-listen="true"
      >
        <NextAuthProvider>
          <NavBar></NavBar>
          <div>{children}</div>
          <SyntheraChatbot />
          <Footer></Footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
