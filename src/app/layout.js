import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        <NextAuthProvider>
          <ReactQueryProvider>
            <ClientProviders>{children}</ClientProviders>
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
