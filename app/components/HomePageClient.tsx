"use client";

import { useState } from "react";
import Link from "next/link";
import InstallModal from "./InstallModal";

export default function HomePageClient() {
  const [mode, setMode] = useState<"daily" | "goal">("daily");

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Mode Switch */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setMode("daily")}
          className={`px-6 py-2.5 min-h-[44px] rounded-full font-semibold text-sm md:text-base transition-all ${
            mode === "daily"
              ? "bg-white text-black shadow-lg"
              : "bg-[#1a1a1a] text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600"
          }`}
        >
          Daily Wallpapers
        </button>
        <button
          onClick={() => setMode("goal")}
          className={`px-6 py-2.5 min-h-[44px] rounded-full font-semibold text-sm md:text-base transition-all ${
            mode === "goal"
              ? "bg-white text-black shadow-lg"
              : "bg-[#1a1a1a] text-gray-400 border border-gray-700 hover:text-white hover:border-gray-600"
          }`}
        >
          Goal Wallpapers
        </button>
      </div>

      {/* CTA Button */}
      <div className="pt-2 md:pt-4">
        {mode === "daily" ? (
          <InstallModal />
        ) : (
          <Link
            href="/install/goal"
            className="inline-block px-8 py-4 min-h-[44px] bg-white text-black rounded-2xl font-semibold text-base md:text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Set Up Goal Wallpaper
          </Link>
        )}
      </div>
    </div>
  );
}
