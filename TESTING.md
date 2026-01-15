# Testing NewWall API

## Correct API Endpoint

The API endpoint is `/api/wallpaper` (singular, not plural).

### Test URLs:

1. **Nature category:**
   ```
   https://newwall.app/api/wallpaper?category=nature
   ```

2. **Minimal category (default):**
   ```
   https://newwall.app/api/wallpaper?category=minimal
   ```

3. **Other categories:**
   ```
   https://newwall.app/api/wallpaper?category=abstract
   https://newwall.app/api/wallpaper?category=ai
   https://newwall.app/api/wallpaper?category=cars
   ```

## Expected Response

The API **directly serves the image file**. When you visit the endpoint, you'll see the image displayed directly in your browser, just like visiting an image URL.

The response is the actual image file (PNG, JPG, or WEBP) with appropriate content-type headers.

## Daily Image Selection

The API uses a date-based selection algorithm:
- **Same image all day**: The API returns the same image for the entire day
- **Changes daily**: A new image is selected each day
- **No repeats**: Uses deterministic hashing based on date + category

### How it works:

1. Creates a hash from the current date (YYYY-MM-DD) + category name
2. Uses that hash to select an image index from the sorted list
3. Same date + category = same image
4. Different date = different image

## Testing Locally

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Visit:
   ```
   http://localhost:3000/api/wallpaper?category=nature
   ```

3. Check the response - you should see the image displayed directly in your browser

## Testing Daily Changes

To test that the image changes daily:

1. Visit the API endpoint today and note which image is displayed
2. Manually change your system date to tomorrow
3. Visit the API endpoint again - it should show a different image
4. Change back to today - it should show the original image

## Troubleshooting

### 404 Error
- Make sure you're using `/api/wallpaper` (singular)
- Check that the category folder exists in `/public/wallpapers/`
- Ensure there are image files in the category folder

### No images found
- Verify images exist in the category folder
- Check file extensions (.jpg, .jpeg, .png, .webp are supported)
- Ensure files are in `/public/wallpapers/{category}/`
