/**
 * iCloud Shortcut Links Configuration
 * 
 * Replace these placeholder links with your actual iCloud shortcut share links.
 * To get an iCloud link:
 * 1. Open Shortcuts app
 * 2. Long-press on your shortcut
 * 3. Tap "Share"
 * 4. Tap "Copy Link"
 * 5. Paste the link here
 */

export const shortcutLinks = {
  nature: "https://www.icloud.com/shortcuts/eb8db03046924ea3a53d10b41ab8feb3",
  cars: "https://www.icloud.com/shortcuts/e214705f517f47289421b32830177998",
  animals: "https://www.icloud.com/shortcuts/49e3c737ceb4410797bf2b7244800b68",
  space: "https://www.icloud.com/shortcuts/a856c9d78aa1422cb519311d584815ff",
  minimal: "https://www.icloud.com/shortcuts/0aa5ef4650c249e4864b82b604682090",
  motivation: "https://www.icloud.com/shortcuts/0aa5ef4650c249e4864b82b604682090",
} as const;

export type Category = keyof typeof shortcutLinks;
