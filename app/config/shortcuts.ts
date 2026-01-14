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
  abstract: "https://www.icloud.com/shortcuts/PLACEHOLDER_ABSTRACT_LINK",
  minimal: "https://www.icloud.com/shortcuts/PLACEHOLDER_MINIMAL_LINK",
  ai: "https://www.icloud.com/shortcuts/PLACEHOLDER_AI_LINK",
  cars: "https://www.icloud.com/shortcuts/PLACEHOLDER_CARS_LINK",
} as const;

export type Category = keyof typeof shortcutLinks;
