import { NextRequest, NextResponse } from "next/server";

// Valid categories that exist in /public/wallpapers
const VALID_CATEGORIES = ["nature", "cars", "animals", "space", "minimal", "motivation"];

// Static list of available images per category
// This needs to be maintained when you add new images
const WALLPAPERS: Record<string, string[]> = {
  nature: [
    "nature-001.png",
    "nature-002.png",
    "nature-003.png",
    "nature-004.png",
    "nature-005.png",
    "nature-006.png",
    "nature-007.png",
    "nature-008.png",
    "nature-009.png",
    "nature-010.png",
  ],
  cars: [
    "cars-001.jpg",
    "cars-002.jpg",
    "cars-003.jpg",
    "cars-004.jpg",
    "cars-005.jpg",
  ],
  animals: [],
  space: [],
  minimal: [],
  motivation: [],
};

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    // Get category from query parameter, default to "minimal"
    const searchParams = request.nextUrl.searchParams;
    let category = searchParams.get("category") || "minimal";

    // Validate category
    if (!VALID_CATEGORIES.includes(category.toLowerCase())) {
      category = "minimal";
    }

    category = category.toLowerCase();

    // Get available images for this category
    let availableImages = WALLPAPERS[category] || [];
    
    // Fallback to nature if category has no images (nature has images)
    if (availableImages.length === 0) {
      category = "nature";
      availableImages = WALLPAPERS[category] || [];
    }

    if (availableImages.length === 0) {
      return NextResponse.json(
        { error: "No wallpapers available" },
        { 
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Use date-based selection for daily consistency
    // This ensures the same image is shown all day, but changes daily
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    
    // Create a simple hash from the date string and category
    // This gives us a deterministic "random" selection per day
    let hash = 0;
    const seed = `${dateString}-${category}`;
    for (let i = 0; i < seed.length; i++) {
      const char = seed.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Use absolute value and modulo to get index
    const dailyIndex = Math.abs(hash) % availableImages.length;
    const selectedImage = availableImages[dailyIndex];

    // Construct the static file URL
    const origin = request.headers.get("origin") || request.nextUrl.origin;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin || "https://newwall.app";
    const imageUrl = `${baseUrl}/wallpapers/${category}/${selectedImage}`;

    // Redirect to the static file instead of reading it
    // This works on both localhost and Vercel
    return NextResponse.redirect(imageUrl, 302);
  } catch (error) {
    console.error("Error fetching wallpaper:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { 
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
