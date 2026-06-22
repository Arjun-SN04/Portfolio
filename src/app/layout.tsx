import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import GridBackground from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arjun S Nair | Full-Stack AI Integration Developer",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  description:
    "Full-stack web developer building real-time, data-driven applications with React.js, Node.js, and MongoDB. Computer Science undergraduate at AKTU with hands-on internship experience.",
  authors: [{ name: "Arjun S Nair" }],
  keywords: [
    "Arjun S Nair",
    "Full-Stack Developer",
    "React.js",
    "Node.js",
    "MongoDB",
    "Web Developer",
    "Portfolio",
    "JavaScript",
    "Express.js",
    "Socket.io",
  ],
  openGraph: {
    title: "Arjun S Nair | Full-Stack Web Developer",
    description:
      "Full-stack web developer building real-time, data-driven applications with React.js, Node.js, and MongoDB.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${hankenGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-hanken">
        <SmoothScroll>
          <CustomCursor />
          <GridBackground />
          <Navbar />
          <main className="grow relative z-20">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
