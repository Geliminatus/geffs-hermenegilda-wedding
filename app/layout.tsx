import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: "Geffs & Hermenegilda — Wedding 2026",
  description: "Join us to celebrate our wedding on August 8, 2026 in Zanzibar, Tanzania.",
  openGraph: { title: "Geffs & Hermenegilda Wedding", description: "August 8, 2026 · Zanzibar, Tanzania" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-black text-white min-h-screen">
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#18181b",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                fontSize: "14px",
                padding: "12px 18px",
              },
              success: { iconTheme: { primary: "#d4af37", secondary: "#000" } },
            }}
          />
        </LanguageProvider>
      </body>
    </html>
  );
}
