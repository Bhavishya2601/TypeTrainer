import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Type Trainer | A Minimalistic typing trainer",
  description: "A Minimalistic typing trainer",
};

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-manrope",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <body>{children}</body>
    </html>
  );
}
