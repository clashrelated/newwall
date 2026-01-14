# NewWall

Minimalist wallpapers for mindful living.

A web app that serves curated and AI-generated wallpapers, designed to work with iOS Shortcuts for automatic daily wallpaper updates.

## Features

- 🎨 Curated and AI-generated wallpapers
- 📱 iOS Shortcuts integration for automatic daily updates
- 🌙 Minimalist, dark-themed UI
- ⚡ Fast, static-first architecture
- 🚀 Ready for Vercel deployment

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Static file serving** (no database, no auth)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building

```bash
npm run build
npm start
```

## Adding Wallpapers

Place your wallpaper images in the appropriate category folders:

```
/public/wallpapers/
  /nature/
  /abstract/
  /minimal/
  /ai/
  /cars/
```

Images can be named arbitrarily (e.g., `nature-001.jpg`, `ai-004.png`, etc.).

Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

## API Endpoint

### GET `/api/wallpaper?category=NAME`

Returns a random wallpaper from the specified category.

**Parameters:**
- `category` (optional): One of `nature`, `abstract`, `minimal`, `ai`, `cars`
  - Defaults to `minimal` if not provided or invalid

**Response:**
```json
{
  "category": "nature",
  "imageUrl": "https://newwall.app/wallpapers/nature/nature-004.jpg"
}
```

**Example:**
```
GET /api/wallpaper?category=nature
GET /api/wallpaper?category=minimal
GET /api/wallpaper
```

## Deployment

This app is ready to deploy on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set the environment variable `NEXT_PUBLIC_BASE_URL` to your domain (optional, defaults to `https://newwall.app`)
4. Deploy!

## iOS Shortcuts Setup

See the `/install/ios` page for detailed step-by-step instructions on setting up automatic wallpaper changes using iOS Shortcuts.

## License

Private project - All rights reserved.
