import type { Metadata } from "next";
import GoalInstallPageClient from "./GoalInstallPageClient";

export const metadata: Metadata = {
  title: "Goal Wallpapers Setup — Visualize Your Progress",
  description:
    "Set up goal-based wallpapers that visualize your progress toward a goal. Automatically update your iPhone wallpaper daily using iOS Shortcuts.",
  keywords: [
    "goal wallpaper",
    "progress tracker wallpaper",
    "countdown wallpaper",
    "iOS wallpaper automation",
    "goal visualization",
    "iPhone wallpaper",
  ],
  openGraph: {
    title: "Goal Wallpapers Setup — Visualize Your Progress",
    description:
      "Set up goal-based wallpapers that visualize your progress toward a goal. Automatically update your iPhone wallpaper daily using iOS Shortcuts.",
    url: "https://newwall.app/install/goal",
    siteName: "NewWall",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goal Wallpapers Setup — Visualize Your Progress",
    description:
      "Set up goal-based wallpapers that visualize your progress toward a goal.",
  },
};

export default function GoalInstallPage() {
  return <GoalInstallPageClient />;
}
