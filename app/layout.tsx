import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NewWall - Minimalist wallpapers for mindful living",
  description: "Curated and AI-generated wallpapers that change automatically every day",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
