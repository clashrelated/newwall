import type { Metadata } from "next";
import IOSInstallPageClient from "./IOSInstallPageClient";

export const metadata: Metadata = {
  title: "How to Automatically Change iPhone Wallpaper Daily",
  description:
    "Step-by-step guide to automatically change your iPhone wallpaper every day using iOS Shortcuts and NewWall. No app required.",
  keywords: [
    "iOS wallpaper shortcut",
    "automatic wallpaper iPhone",
    "daily wallpaper shortcut",
    "iPhone wallpaper automation",
    "iOS shortcuts wallpaper",
    "how to change wallpaper automatically",
  ],
};

export default function IOSInstallPage() {
  return <IOSInstallPageClient />;
}
