"use client";

import { useState } from "react";
import Link from "next/link";
import { shortcutLinks, type Category } from "@/app/config/shortcuts";

export default function IOSInstallPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const categories: { key: Category; label: string }[] = [
    { key: "nature", label: "Nature" },
    { key: "abstract", label: "Abstract" },
    { key: "minimal", label: "Minimal" },
    { key: "ai", label: "AI" },
    { key: "cars", label: "Cars" },
  ];

  const handleOpenShortcut = () => {
    if (!selectedCategory) return;
    window.open(shortcutLinks[selectedCategory], "_blank");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
          >
            ← Back
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            iOS Shortcuts Setup
          </h1>
          <p className="text-lg text-gray-400">
            Follow these steps to automatically change your wallpaper daily.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {/* Step 1: Open Shortcuts App */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Open Shortcuts App
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Open the <strong className="text-white"><a href="https://apps.apple.com/us/app/shortcuts/id915249334" target="_blank">Shortcuts</a></strong> app on your iPhone.
                  If you don&apos;t have it, download it from the App Store.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2: Choose Your Category */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Choose Your Category
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Select the wallpaper category you&apos;d like to use for your daily updates.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.key}
                      onClick={() => setSelectedCategory(category.key)}
                      className={`px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                        selectedCategory === category.key
                          ? "bg-white text-black shadow-lg scale-105"
                          : "bg-[#252525] text-white border border-gray-700 hover:border-gray-600 hover:bg-[#2a2a2a]"
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Get Shortcut - Only shows after category selection */}
          {selectedCategory && (
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-lg transition-all duration-300 ease-in-out">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Get Shortcut
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    Tap the button below to open the shortcut link for{" "}
                    <strong className="text-white">{categories.find((c) => c.key === selectedCategory)?.label}</strong>.
                    This will open the Shortcuts app and prompt you to add it to your shortcuts.
                  </p>
                  <button
                    onClick={handleOpenShortcut}
                    className="w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 bg-white text-black hover:bg-gray-100 shadow-lg hover:shadow-xl"
                  >
                    Open Shortcut
                  </button>
                  <p className="text-sm text-gray-400 mt-3 text-center">
                    Tap &quot;Add Shortcut&quot; when prompted to add it to your shortcuts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Set Up Daily Automation */}
          <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Set Up Daily Automation
                </h3>
                <div className="space-y-3 text-gray-400 leading-relaxed">
                  <p>
                    Tap the <strong className="text-white">Automation</strong> tab at the bottom,
                    then tap <strong className="text-white">+</strong> to create a new automation.
                  </p>
                  <p>
                    Select <strong className="text-white">Time of Day</strong> and set it to run daily
                    at your preferred time (e.g., 6:00 AM).
                  </p>
                  <p>
                    Tap <strong className="text-white">Add Action</strong>, then search for and select
                    <strong className="text-white"> &quot;Run Shortcut&quot;</strong>.
                  </p>
                  <p>
                    Choose the shortcut you just added from <strong className="text-white">&quot;My Shortcuts&quot;</strong>.
                  </p>
                  <div className="bg-[#0a0a0a] rounded-xl p-4 mt-4 border border-gray-700">
                    <p className="text-sm text-gray-500 mb-2">⚠️ Important:</p>
                    <p className="text-sm text-gray-400">
                      Turn <strong className="text-white">OFF</strong> &quot;Ask Before Running&quot; so it runs automatically in the background.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-[#1a1a1a] rounded-2xl border border-gray-800">
          <p className="text-gray-400 text-center">
            That&apos;s it! Your wallpaper will now change automatically every day. 🎉
          </p>
        </div>
      </div>
    </main>
  );
}
