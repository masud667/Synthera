import { Inter  } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/NavBar";
import SyntheraChatbot from "./components/chatbot/SyntheraChatbot";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { ThemeProvider } from "next-themes";
import Footer from "./components/Footer";

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
        <NextAuthProvider>
           <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem>
          <NavBar></NavBar>
          <div>{children}</div>
          <SyntheraChatbot />
          <Footer></Footer>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
