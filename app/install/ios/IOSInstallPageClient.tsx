"use client";

import { useState } from "react";
import Link from "next/link";
import { shortcutLinks, type Category } from "@/app/config/shortcuts";

export default function IOSInstallPageClient() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories: { key: Category; label: string }[] = [
    { key: "nature", label: "Nature" },
    { key: "cars", label: "Cars" },
    { key: "animals", label: "Animals" },
    { key: "space", label: "Space" },
    { key: "minimal", label: "Minimal" },
    { key: "motivation", label: "Motivation" },
  ];

  const handleOpenShortcut = () => {
    if (!selectedCategory) return;
    window.open(shortcutLinks[selectedCategory], "_blank");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] px-4 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-4 md:mb-6 transition-colors min-h-[44px] py-2 -ml-2 pl-2"
          >
            ← Back
          </Link>
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-3 md:mb-4">
            Automatically change your iPhone wallpaper every day
          </h1>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            NewWall uses Apple&apos;s iOS Shortcuts to automatically update your wallpaper every day.
            No app installation required.
          </p>
        </header>

        {/* Steps */}
        <div className="space-y-4 md:space-y-6">
          {/* Step 1: Choose Your Category */}
          <section className="bg-[#1a1a1a] rounded-2xl p-4 md:p-6 border border-gray-800 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
              Step 1: Choose your wallpaper style
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
              Select the wallpaper category you&apos;d like to use for your daily updates.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-3">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-3 md:px-4 py-3 min-h-[44px] rounded-xl font-semibold text-sm md:text-base transition-all duration-200 active:scale-95 ${
                    selectedCategory === category.key
                      ? "bg-white text-black shadow-lg scale-105"
                      : "bg-[#252525] text-white border border-gray-700 hover:border-gray-600 hover:bg-[#2a2a2a]"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </section>

          {/* Step 2: Get Shortcut */}
          {selectedCategory && (
            <section className="bg-[#1a1a1a] rounded-2xl p-4 md:p-6 border border-gray-800 shadow-lg transition-all duration-300 ease-in-out">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Step 2: Get the shortcut
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
                Tap the button below to open the shortcut link for{" "}
                <strong className="text-white">{categories.find((c) => c.key === selectedCategory)?.label}</strong>.
                This will open the Shortcuts app and prompt you to add it to your shortcuts.
              </p>
              <button
                onClick={handleOpenShortcut}
                className="w-full py-4 min-h-[44px] rounded-xl font-semibold text-base md:text-lg transition-all duration-200 bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl active:bg-gray-200"
              >
                Open Shortcut
              </button>
              <p className="text-xs md:text-sm text-gray-400 mt-3 text-center leading-relaxed">
                Tap &quot;Add Shortcut&quot; when prompted to add it to your shortcuts.
              </p>
            </section>
          )}

          {/* Step 3: Create Automation */}
          <section className="bg-[#1a1a1a] rounded-2xl p-4 md:p-6 border border-gray-800 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Step 3: Create a daily automation in iOS Shortcuts
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed pt-1">
                  Open the <strong className="text-white"><a href="https://apps.apple.com/us/app/shortcuts/id915249334" target="_blank" className="underline underline-offset-2 hover:text-gray-200 transition-colors">Shortcuts</a></strong> app on your iPhone.
                </p>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed pt-1">
                  Go to the <strong className="text-white">Automation</strong> tab at the bottom.
                </p>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed pt-1">
                  Tap <strong className="text-white">+</strong> to create a new automation.
                </p>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed pt-1">
                  Select <strong className="text-white">Time of Day</strong> and set it to run daily at your preferred time (e.g., 6:00 AM).
                </p>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed pt-1">
                  Choose <strong className="text-white">&quot;Run Immediately&quot;</strong> when prompted.
                </p>
              </div>
            </div>
          </section>

          {/* Step 4: Add Actions */}
          <section className="bg-[#1a1a1a] rounded-2xl p-4 md:p-6 border border-gray-800 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Step 4: Add the NewWall shortcut actions
            </h2>
            <div className="space-y-4 text-sm md:text-base text-gray-400 leading-relaxed">
              <p>
                Tap <strong className="text-white">Add Action</strong>, then search for and select
                <strong className="text-white"> &quot;Run Shortcut&quot;</strong>.
              </p>
              <p>
                Choose the shortcut you just added from <strong className="text-white">&quot;My Shortcuts&quot;</strong>.
              </p>
              <div className="bg-[#0a0a0a] rounded-xl p-3 md:p-4 mt-4 border border-gray-700">
                <p className="text-xs md:text-sm text-gray-500 mb-2">⚠️ Important:</p>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  Turn <strong className="text-white">OFF</strong> &quot;Ask Before Running&quot; so it runs automatically in the background.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Goal Wallpapers Link */}
        <section className="mt-8 md:mt-12 p-4 md:p-6 bg-[#1a1a1a] rounded-2xl border border-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center">
            Prefer goal-based wallpapers?
          </h2>
          <p className="text-sm md:text-base text-gray-400 text-center leading-relaxed mb-4">
            Create a wallpaper that visualizes your progress toward a goal. Perfect for tracking milestones and staying motivated.
          </p>
          <div className="text-center">
            <Link
              href="/install/goal"
              className="inline-block px-6 py-3 min-h-[44px] bg-white text-black rounded-xl font-semibold text-base hover:bg-gray-100 transition-colors"
            >
              Set Up Goal Wallpaper →
            </Link>
          </div>
        </section>

        {/* Footer Note */}
        <section className="mt-8 md:mt-12 p-4 md:p-6 bg-[#1a1a1a] rounded-2xl border border-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
            That&apos;s it 🎉
          </h2>
          <p className="text-sm md:text-base text-gray-400 text-center leading-relaxed">
            Your wallpaper will now update automatically every day.
          </p>
        </section>

        {/* Footer Attribution */}
        <footer className="border-t border-white/5 py-8 mt-8 md:mt-12 text-center">
          <p className="text-sm text-[#444444]">
            Made by{" "}
            <a
              href="https://www.linkedin.com/in/bhabishya/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              @bhabishya
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
