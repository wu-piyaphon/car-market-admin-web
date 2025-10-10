import { log } from "./log";

// Cache to store fetched blobs by URL to avoid duplicate requests
const fetchCache = new Map<string, Promise<Blob | null>>();

/**
 * Convert image URLs to File objects for form submission
 * Automatically deduplicates URLs to avoid fetching the same image multiple times
 * @param imageUrls Array of image URLs
 * @returns Promise that resolves to array of File objects
 */
export async function formatImageUrlsToFiles(
  imageUrls: string[]
): Promise<File[]> {
  const fetchImageBlob = async (url: string): Promise<Blob | null> => {
    // Check if we already have this URL in cache
    if (fetchCache.has(url)) {
      return fetchCache.get(url)!;
    }

    // Create the fetch promise and cache it immediately
    const fetchPromise = (async (): Promise<Blob | null> => {
      try {
        const response = await fetch(url, {
          mode: "cors",
          headers: { Accept: "image/*" },
          signal: AbortSignal.timeout(10000), // 10 second timeout
        });

        if (!response.ok) {
          console.warn(`Failed to fetch image: ${url} (${response.status})`);
          return null;
        }

        const blob = await response.blob();

        if (!blob.type.startsWith("image/")) {
          console.warn(`Skipping non-image file: ${url}`);
          return null;
        }

        return blob;
      } catch (error) {
        log.error(error);
        return null;
      }
    })();

    fetchCache.set(url, fetchPromise);
    return fetchPromise;
  };

  const processImageUrl = async (
    url: string,
    index: number
  ): Promise<File | null> => {
    const blob = await fetchImageBlob(url);

    if (!blob) {
      return null;
    }

    const fileName = generateFileName(url, blob.type, index);
    return new File([blob], fileName, { type: blob.type });
  };

  const generateFileName = (
    url: string,
    mimeType: string,
    index: number
  ): string => {
    // Extract filename from URL and remove query parameters
    const urlPath = new URL(url).pathname;
    let fileName = urlPath.split("/").pop() || "";

    // If no valid filename, generate one
    if (!fileName || !fileName.includes(".")) {
      const extension = mimeType.split("/")[1] || "jpg";
      fileName = `image-${index}.${extension}`;
    }

    return fileName;
  };

  // Process all URLs concurrently with Promise.all
  // Duplicate URLs will automatically reuse the same fetch promise
  const results = await Promise.all(
    imageUrls.map((url, index) => processImageUrl(url, index))
  );

  // Filter out failed downloads
  return results.filter((file): file is File => file !== null);
}
