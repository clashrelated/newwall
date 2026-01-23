"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function GoalInstallPageClient() {
  const [title, setTitle] = useState("");
  const [goalType, setGoalType] = useState<"progress" | "countdown">("countdown");
  const [style, setStyle] = useState<"dots" | "blocks" | "bars">("dots");
  const [startYear, setStartYear] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endYear, setEndYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endDay, setEndDay] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  // Set default dates (today and 90 days from now)
  useEffect(() => {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 90);

    setStartYear(today.getFullYear().toString());
    setStartMonth(String(today.getMonth() + 1).padStart(2, "0"));
    setStartDay(String(today.getDate()).padStart(2, "0"));
    setEndYear(future.getFullYear().toString());
    setEndMonth(String(future.getMonth() + 1).padStart(2, "0"));
    setEndDay(String(future.getDate()).padStart(2, "0"));
  }, []);

  // Generate URL whenever form changes
  useEffect(() => {
    if (!title.trim()) {
      setGeneratedUrl("");
      return;
    }

    const startDate = `${startYear}-${startMonth.padStart(2, "0")}-${startDay.padStart(2, "0")}`;
    const endDate = `${endYear}-${endMonth.padStart(2, "0")}-${endDay.padStart(2, "0")}`;

    // Basic validation
    const start = new Date(startDate + "T00:00:00Z");
    const end = new Date(endDate + "T23:59:59Z");

    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) {
      setGeneratedUrl("");
      return;
    }

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://newwall.app";
    const params = new URLSearchParams({
      title: title.trim(),
      start: startDate,
      end: endDate,
      type: goalType,
      style: goalType === "progress" ? style : "dots",
      width: "1290",
      height: "2796",
    });

    setGeneratedUrl(`${baseUrl}/api/goal-wallpaper?${params.toString()}`);
  }, [title, goalType, style, startYear, startMonth, startDay, endYear, endMonth, endDay]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Goal title is required";
    }

    const startDate = `${startYear}-${startMonth.padStart(2, "0")}-${startDay.padStart(2, "0")}`;
    const endDate = `${endYear}-${endMonth.padStart(2, "0")}-${endDay.padStart(2, "0")}`;
    const start = new Date(startDate + "T00:00:00Z");
    const end = new Date(endDate + "T23:59:59Z");

    if (isNaN(start.getTime())) {
      newErrors.startDate = "Invalid start date";
    }
    if (isNaN(end.getTime())) {
      newErrors.endDate = "Invalid end date";
    }
    if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end <= start) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopyUrl = async () => {
    if (!generatedUrl) return;
    try {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleTestUrl = () => {
    if (!generatedUrl) return;
    window.open(generatedUrl, "_blank");
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
            Goal Wallpapers Setup
          </h1>
          <p className="text-base md:text-lg text-gray-400 leading-relaxed">
            Create a wallpaper that visualizes your progress toward a goal. Your wallpaper will update automatically every day until your goal date.
          </p>
        </header>

        {/* Steps */}
        <div className="space-y-4 md:space-y-6">
          {/* Step 1: Define Your Goal */}
          <section className="bg-[#1a1a1a] rounded-2xl p-4 md:p-6 border border-gray-800 shadow-lg">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="flex-shrink-0 w-10 h-10 bg-white text-black rounded-full flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Define your goal
              </h2>
            </div>

            {/* Goal Title */}
            <div className="mb-6">
              <label className="block text-sm md:text-base text-gray-400 mb-2">
                Goal Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Run a Marathon"
                className="w-full px-4 py-3 min-h-[44px] bg-[#0a0a0a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
              />
              {errors.title && (
                <p className="text-red-400 text-sm mt-2">{errors.title}</p>
              )}
            </div>

            {/* Goal Type */}
            <div className="mb-6">
              <label className="block text-sm md:text-base text-gray-400 mb-2">
                Goal Type
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setGoalType("countdown")}
                  className={`flex-1 px-4 py-3 min-h-[44px] rounded-xl font-semibold text-sm md:text-base transition-all ${
                    goalType === "countdown"
                      ? "bg-white text-black"
                      : "bg-[#252525] text-white border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  Countdown
                </button>
                <button
                  onClick={() => setGoalType("progress")}
                  className={`flex-1 px-4 py-3 min-h-[44px] rounded-xl font-semibold text-sm md:text-base transition-all ${
                    goalType === "progress"
                      ? "bg-white text-black"
                      : "bg-[#252525] text-white border border-gray-700 hover:border-gray-600"
                  }`}
                >
                  Progress
                </button>
              </div>
            </div>

            {/* Visual Style (only for progress) */}
            {goalType === "progress" && (
              <div className="mb-6">
                <label className="block text-sm md:text-base text-gray-400 mb-2">
                  Visual Style
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(["dots", "blocks", "bars"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`px-3 py-3 min-h-[44px] rounded-xl font-semibold text-sm capitalize transition-all ${
                        style === s
                          ? "bg-white text-black"
                          : "bg-[#252525] text-white border border-gray-700 hover:border-gray-600"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Start Date */}
            <div className="mb-6">
              <label className="block text-sm md:text-base text-gray-400 mb-2">
                Start Date
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <input
                  type="text"
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  placeholder="Year"
                  className="px-3 py-3 min-h-[44px] bg-[#0a0a0a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-center"
                />
                <input
                  type="text"
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  placeholder="Month"
                  className="px-3 py-3 min-h-[44px] bg-[#0a0a0a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-center"
                />
                <input
                  type="text"
                  value={startDay}
                  onChange={(e) => setStartDay(e.target.value)}
                  placeholder="Day"
                  className="px-3 py-3 min-h-[44px] bg-[#0a0a0a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-center"
                />
              </div>
              {errors.startDate && (
                <p className="text-red-400 text-sm mt-2">{errors.startDate}</p>
              )}
            </div>

            {/* End Date */}
            <div className="mb-4">
              <label className="block text-sm md:text-base text-gray-400 mb-2">
                End Date (Deadline)
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                <input
                  type="text"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  placeholder="Year"
                  className="px-3 py-3 min-h-[44px] bg-[#0a0a0a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-center"
                />
                <input
                  type="text"
                  value={endMonth}
                  onChange={(e) => setEndMonth(e.target.value)}
                  placeholder="Month"
                  className="px-3 py-3 min-h-[44px] bg-[#0a0a0a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-center"
                />
                <input
                  type="text"
                  value={endDay}
                  onChange={(e) => setEndDay(e.target.value)}
                  placeholder="Day"
                  className="px-3 py-3 min-h-[44px] bg-[#0a0a0a] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors text-center"
                />
              </div>
              {errors.endDate && (
                <p className="text-red-400 text-sm mt-2">{errors.endDate}</p>
              )}
            </div>
          </section>

          {/* Step 2: Generate URL */}
          {generatedUrl && (
            <section className="bg-[#1a1a1a] rounded-2xl p-4 md:p-6 border border-gray-800 shadow-lg">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Step 2: Copy your wallpaper URL
              </h2>
              <p className="text-sm md:text-base text-gray-400 leading-relaxed mb-4">
                This URL generates your goal wallpaper. Copy it to use in iOS Shortcuts.
              </p>
              <div className="flex gap-2.5 mb-3">
                <input
                  type="text"
                  value={generatedUrl}
                  readOnly
                  className="flex-1 px-4 py-3 min-h-[44px] bg-[#0a0a0a] border border-gray-700 rounded-xl text-white text-sm break-all"
                />
                <button
                  onClick={handleCopyUrl}
                  className="px-6 py-3 min-h-[44px] bg-white text-black rounded-xl font-semibold text-sm md:text-base hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
              <button
                onClick={handleTestUrl}
                className="text-sm text-gray-400 hover:text-white underline"
              >
                Test in browser →
              </button>
            </section>
          )}

          {/* Step 3: Shortcuts Instructions */}
          <section className="bg-[#1a1a1a] rounded-2xl p-4 md:p-6 border border-gray-800 shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Step 3: Set up iOS Shortcuts automation
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
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  6
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed pt-1">
                  Tap <strong className="text-white">Add Action</strong>, search for <strong className="text-white">&quot;Get Contents of URL&quot;</strong>, and paste the URL you copied.
                </p>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold text-sm">
                  7
                </div>
                <p className="text-sm md:text-base text-gray-400 leading-relaxed pt-1">
                  Add another action: <strong className="text-white">&quot;Set Wallpaper&quot;</strong>, and use the result from the previous action.
                </p>
              </div>
              <div className="bg-[#0a0a0a] rounded-xl p-3 md:p-4 mt-4 border border-gray-700">
                <p className="text-xs md:text-sm text-gray-500 mb-2">⚠️ Important:</p>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  Turn <strong className="text-white">OFF</strong> &quot;Ask Before Running&quot; so it runs automatically in the background.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <section className="mt-8 md:mt-12 p-4 md:p-6 bg-[#1a1a1a] rounded-2xl border border-gray-800">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">
            That&apos;s it 🎉
          </h2>
          <p className="text-sm md:text-base text-gray-400 text-center leading-relaxed">
            Your wallpaper will now update automatically every day, showing your progress toward your goal.
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
