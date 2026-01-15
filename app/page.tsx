import type { Metadata } from "next";
import { useState } from "react";
import Link from "next/link";
import InstallModal from "./components/InstallModal";

export const metadata: Metadata = {
  title: "Minimalist Wallpapers That Change Every Day",
  description:
    "Automatically update your iPhone wallpaper daily with calm, minimalist, and AI-generated designs. Powered by iOS Shortcuts. No app required.",
};

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center px-4 py-8 md:py-12 min-h-screen">
          <div className="max-w-2xl w-full text-center space-y-6 md:space-y-8">
            {/* H1 - SEO Critical */}
            <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight tracking-tight">
              Minimalist wallpapers
              <br className="hidden md:block" />
              <span className="block md:inline">
                <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                  for mindful living.
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed px-2">
              Automatically updated wallpapers for your iPhone — calm, focused, and distraction-free.
              <br className="hidden md:block" />
              <span className="block md:inline"> Powered by iOS Shortcuts. No app required.</span>
            </p>

            {/* CTA Button */}
            <div className="pt-2 md:pt-4">
              <InstallModal />
            </div>
          </div>
        </section>

        {/* Trust / Value Section */}
        <section className="px-4 py-12 md:py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Designed for focus, not distraction
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-400">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-2">Daily Updates</h3>
              <p className="text-sm md:text-base leading-relaxed">
                Wallpapers refresh automatically every day, so you always have something fresh.
              </p>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-2">Minimalist Design</h3>
              <p className="text-sm md:text-base leading-relaxed">
                Curated and AI-generated designs focused on calm and mindfulness.
              </p>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-2">No Ads, No Tracking</h3>
              <p className="text-sm md:text-base leading-relaxed">
                Completely free with no accounts, ads, or data collection.
              </p>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
              <h3 className="text-xl font-semibold text-white mb-2">iOS Shortcuts</h3>
              <p className="text-sm md:text-base leading-relaxed">
                Works entirely with Apple&apos;s built-in Shortcuts app. No app installation needed.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="px-4 py-12 md:py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            How NewWall works
          </h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Choose a wallpaper style</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Select from categories like Minimal, Abstract, Nature, AI-generated, or Cars.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Set up daily automation</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Create a simple automation in iOS Shortcuts that runs once per day.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Wake up to fresh wallpapers</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Your wallpaper updates automatically every day. Set it once and forget it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="px-4 py-12 md:py-16 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
            Wallpaper styles
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-3xl mx-auto">
            {["Minimal", "Abstract", "Nature", "AI-generated", "Cars"].map((category) => (
              <div
                key={category}
                className="bg-[#1a1a1a] rounded-xl p-4 border border-gray-800 text-center"
              >
                <p className="text-white font-semibold">{category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-12 md:py-16 max-w-2xl mx-auto text-center">
          <Link
            href="/install/ios"
            className="inline-block px-8 py-4 min-h-[44px] bg-white text-black rounded-2xl font-semibold text-base md:text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            Learn how to install NewWall →
          </Link>
        </section>

        {/* Footer */}
        <footer className="px-4 py-8 border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-gray-400 leading-relaxed">
              NewWall is a minimalist wallpaper project focused on mindful living, built for people who want a calm digital environment.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
