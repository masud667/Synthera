"use client";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Footer from "../Footer";
import NavBar from "../NavBar";
import SyntheraChatbot from "../chatbot/SyntheraChatbot";

export default function ClientProviders({ children }) {
  const [mounted, setMounted] = useState(false);

  // only render after client mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // prevent hydration mismatch

  return (
    <ThemeProvider
            attribute="data-theme"
            defaultTheme="light"
            enableSystem
          >
      <SessionProvider>
        <NavBar/>
        <main>{children}</main>
        <SyntheraChatbot />
        <Footer />
      </SessionProvider>
    </ThemeProvider>
  );
}
