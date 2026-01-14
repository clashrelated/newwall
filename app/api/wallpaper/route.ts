import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Valid categories that exist in /public/wallpapers
const VALID_CATEGORIES = ["nature", "abstract", "minimal", "ai", "cars"];

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

    // Path to the category folder in public
    const wallpapersDir = path.join(process.cwd(), "public", "wallpapers", category);

    // Check if directory exists
    if (!fs.existsSync(wallpapersDir)) {
      // Fallback to minimal if category folder doesn't exist
      const fallbackDir = path.join(process.cwd(), "public", "wallpapers", "minimal");
      if (!fs.existsSync(fallbackDir)) {
        return NextResponse.json(
          { error: "No wallpapers available" },
          { status: 404 }
        );
      }
      category = "minimal";
    }

    // Read all files in the category directory
    const files = fs.readdirSync(wallpapersDir);

    // Filter for image files
    const imageFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return [".jpg", ".jpeg", ".png", ".webp"].includes(ext);
    });

    if (imageFiles.length === 0) {
      return NextResponse.json(
        { error: "No images found in category" },
        { status: 404 }
      );
    }

    // Randomly select one image
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const selectedImage = imageFiles[randomIndex];

    // Construct the full URL
    // Use the request origin, or fallback to environment variable or default
    const origin = request.headers.get("origin") || request.nextUrl.origin;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin || "https://newwall.app";
    const imageUrl = `${baseUrl}/wallpapers/${category}/${selectedImage}`;

    return NextResponse.json({
      category: category,
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Error fetching wallpaper:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
