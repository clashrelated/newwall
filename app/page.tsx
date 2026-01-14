"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] flex flex-col items-center justify-center px-4 py-12">
      {/* Main Content */}
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
          Minimalist wallpapers
          <br />
          <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
            for mindful living.
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
          Curated and AI-generated wallpapers that change automatically every day.
          <br />
          Set it once, and let your phone refresh itself.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-8 py-4 bg-white text-black rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Install
          </button>
        </div>
      </div>

      {/* Install Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#1a1a1a] rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">Choose your device</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* iPhone Option */}
              <div className="bg-[#252525] rounded-2xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">iPhone</h3>
                <p className="text-gray-400 mb-6">
                  Use iOS Shortcuts to automatically change your wallpaper daily.
                </p>
                <Link href="/install/ios">
                  <button className="w-full py-3 bg-white text-black rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    Get Instructions
                  </button>
                </Link>
              </div>

              {/* Android Option (Placeholder) */}
              <div className="bg-[#252525] rounded-2xl p-6 border border-gray-700 opacity-60">
                <h3 className="text-xl font-semibold text-white mb-4">Android</h3>
                <p className="text-gray-400 mb-6">
                  Coming soon. We&apos;re working on Android support.
                </p>
                <button
                  disabled
                  className="w-full py-3 bg-gray-700 text-gray-500 rounded-xl font-semibold cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
