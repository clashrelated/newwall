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

    // Sort files to ensure consistent ordering
    const sortedFiles = imageFiles.sort();

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
    const dailyIndex = Math.abs(hash) % sortedFiles.length;
    const selectedImage = sortedFiles[dailyIndex];

    // Read the image file
    const imagePath = path.join(wallpapersDir, selectedImage);
    const imageBuffer = fs.readFileSync(imagePath);

    // Determine content type based on file extension
    const ext = path.extname(selectedImage).toLowerCase();
    let contentType = "image/png";
    if (ext === ".jpg" || ext === ".jpeg") {
      contentType = "image/jpeg";
    } else if (ext === ".webp") {
      contentType = "image/webp";
    }

    // Return the image directly with appropriate headers
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
        "Content-Disposition": `inline; filename="${selectedImage}"`,
      },
    });
  } catch (error) {
    console.error("Error fetching wallpaper:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
