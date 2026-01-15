import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://newwall.app"),
  title: {
    default: "NewWall — Minimalist Wallpapers for Mindful Living",
    template: "%s | NewWall",
  },
  description:
    "NewWall delivers minimalist and AI-generated wallpapers that update automatically every day using iOS Shortcuts. Calm, focused, and distraction-free.",
  keywords: [
    "daily wallpaper",
    "minimalist wallpaper",
    "iOS wallpaper automation",
    "wallpaper shortcuts",
    "mindful wallpapers",
    "aesthetic wallpapers",
    "lock screen wallpaper",
    "NewWall",
    "automatic wallpaper iPhone",
    "iOS shortcuts wallpaper",
    "daily wallpaper app",
  ],
  authors: [{ name: "NewWall" }],
  creator: "NewWall",
  publisher: "NewWall",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "NewWall — Minimalist Wallpapers for Mindful Living",
    description:
      "Automatically updated minimalist wallpapers using iOS Shortcuts. No app required.",
    url: "https://newwall.app",
    siteName: "NewWall",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NewWall minimalist wallpapers preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "NewWall — Minimalist Wallpapers for Mindful Living",
    description:
      "Automatically updated minimalist wallpapers using iOS Shortcuts.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ahOlv9-GBTmJOSkzgkVZg2z_b1NuIUTxJrwEpDgLdks",
  },
  icons: {
    icon: "/newwall logo.png",
    apple: "/newwall logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7821EKCDC6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7821EKCDC6');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
