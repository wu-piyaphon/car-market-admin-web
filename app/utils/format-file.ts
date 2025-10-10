import { log } from "./log";

/**
 * Convert image URLs to File objects for form submission
 * @param imageUrls Array of image URLs
 * @returns Promise that resolves to array of File objects
 */
export async function formatImageUrlsToFiles(
  imageUrls: string[]
): Promise<File[]> {
  // Create an async function to process each URL
  const processImageUrl = async (
    url: string,
    index: number
  ): Promise<File | null> => {
    try {
      // Fetch the image as blob
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Accept: "image/*",
        },
      });

      if (!response.ok) {
        console.warn(`Failed to fetch image: ${url} (${response.status})`);
        return null;
      }

      const blob = await response.blob();

      // Skip if not an image
      if (!blob.type.startsWith("image/")) {
        console.warn(`Skipping non-image file: ${url}`);
        return null;
      }

      // Extract filename from URL or create a default one
      const urlParts = url.split("/");
      let fileName = urlParts[urlParts.length - 1];

      // Clean up filename and ensure it has an extension
      if (!fileName || !fileName.includes(".")) {
        const extension = blob.type.split("/")[1] || "jpg";
        fileName = `image-${Date.now()}-${index}.${extension}`;
      }

      // Remove query parameters from filename
      fileName = fileName.split("?")[0];

      // Create File object from blob
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      log.error(error);
      return null;
    }
  };

  // Process all URLs concurrently
  const results = await Promise.all(
    imageUrls.map((url, index) => processImageUrl(url, index))
  );

  // Filter out null results (failed downloads)
  const files = results.filter((file): file is File => file !== null);

  return files;
}
