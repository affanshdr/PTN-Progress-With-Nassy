import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NassyProvider } from "@/components/frontend/NassyProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PTN Progress with Nassy",
  description:
    "PTN Progress with Nassy — catat progres belajar, bangun streak, dan belajar bersama pejuang PTN.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NassyProvider>{children}</NassyProvider>
      </body>
    </html>
  );
}
