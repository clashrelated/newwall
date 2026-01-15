"use client";

import { useState } from "react";
import Link from "next/link";

export default function InstallModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-8 py-4 min-h-[44px] bg-white text-black rounded-2xl font-semibold text-base md:text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
      >
        Install on iPhone
      </button>

      {/* Install Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#1a1a1a] rounded-2xl md:rounded-3xl p-4 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white pr-2">Choose your device</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-3xl md:text-2xl leading-none min-w-[44px] min-h-[44px] flex items-center justify-center -mr-2"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 md:space-y-6">
              {/* iPhone Option */}
              <div className="bg-[#252525] rounded-2xl p-4 md:p-6 border border-gray-700">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">iPhone</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed">
                  Use iOS Shortcuts to automatically change your wallpaper daily.
                </p>
                <Link href="/install/ios">
                  <button className="w-full py-3 min-h-[44px] bg-white text-black rounded-xl font-semibold text-base hover:bg-gray-100 transition-colors active:bg-gray-200">
                    Get Instructions
                  </button>
                </Link>
              </div>

              {/* Android Option (Placeholder) */}
              <div className="bg-[#252525] rounded-2xl p-4 md:p-6 border border-gray-700 opacity-60">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3 md:mb-4">Android</h3>
                <p className="text-sm md:text-base text-gray-400 mb-4 md:mb-6 leading-relaxed">
                  Coming soon. We&apos;re working on Android support.
                </p>
                <button
                  disabled
                  className="w-full py-3 min-h-[44px] bg-gray-700 text-gray-500 rounded-xl font-semibold text-base cursor-not-allowed"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
