export type ImageCompressOptions = {
  quality?: number; // 0.1 to 1.0, default 0.9 for high quality
  maxWidth?: number; // Maximum width in pixels
  maxHeight?: number; // Maximum height in pixels
  maxSizeKB?: number; // Skip compression if already under this size
};

/**
 * Compress a single image file to WebP format
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Promise that resolves to compressed WebP File
 */
export async function compressImage(
  file: File,
  options: ImageCompressOptions = {}
): Promise<File> {
  const {
    quality = 0.9, // High quality by default
    maxWidth = 1920,
    maxHeight = 1080,
    maxSizeKB = 100, // Skip compression if file is already small
  } = options;

  // Skip compression for non-image files
  if (!file.type.startsWith("image/")) {
    return file;
  }

  // Skip compression if file is already small enough
  if (file.size <= maxSizeKB * 1024) {
    return file;
  }

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      reject(new Error("Failed to get canvas context"));
      return;
    }

    const img = new Image();
    let blobUrl: string | null = null;
    let isResolved = false;

    // Cleanup function to prevent memory leaks
    const cleanup = () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
        blobUrl = null;
      }
      // Clear canvas
      canvas.width = 0;
      canvas.height = 0;
    };

    // Timeout to prevent hanging promises
    const timeoutId = setTimeout(() => {
      if (!isResolved) {
        isResolved = true;
        cleanup();
        console.warn(
          `Image compression timeout for ${file.name}, using original file`
        );
        resolve(file);
      }
    }, 30000); // 30 second timeout

    img.onload = () => {
      if (isResolved) return;

      try {
        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;

        const aspectRatio = width / height;

        if (width > maxWidth) {
          width = maxWidth;
          height = width / aspectRatio;
        }

        if (height > maxHeight) {
          height = maxHeight;
          width = height * aspectRatio;
        }

        // Set canvas dimensions
        canvas.width = Math.round(width);
        canvas.height = Math.round(height);

        // Draw image with high quality settings
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to WebP with specified quality
        canvas.toBlob(
          blob => {
            if (isResolved) return;

            clearTimeout(timeoutId);
            isResolved = true;
            cleanup();

            if (blob) {
              // Create filename with .webp extension
              const originalName = file.name.split(".").slice(0, -1).join(".");
              const webpFileName = `${originalName}.webp`;

              const compressedFile = new File([blob], webpFileName, {
                type: "image/webp",
                lastModified: Date.now(),
              });

              resolve(compressedFile);
            } else {
              console.warn("WebP compression failed, using original file");
              resolve(file);
            }
          },
          "image/webp",
          quality
        );
      } catch (error) {
        if (!isResolved) {
          clearTimeout(timeoutId);
          isResolved = true;
          cleanup();
          console.warn(`Canvas drawing failed for ${file.name}:`, error);
          resolve(file);
        }
      }
    };

    img.onerror = error => {
      if (!isResolved) {
        clearTimeout(timeoutId);
        isResolved = true;
        cleanup();
        console.warn(
          `Failed to load image for compression ${file.name}:`,
          error
        );
        resolve(file);
      }
    };

    // Load the image
    blobUrl = URL.createObjectURL(file);
    img.src = blobUrl;
  });
}

/**
 * Compress multiple image files to WebP format
 * @param files - Array of files to compress
 * @param options - Compression options
 * @returns Promise that resolves to array of compressed WebP Files
 */
export async function compressImages(
  files: File[],
  options: ImageCompressOptions = {}
): Promise<File[]> {
  // Process all files concurrently - each compressImage handles its own race conditions
  const promises = files.map(async file => {
    try {
      return await compressImage(file, options);
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error);
      // Return original file on error
      return file;
    }
  });

  // Use Promise.allSettled to ensure all files are processed even if some fail
  const results = await Promise.allSettled(promises);

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    } else {
      console.error(
        `Compression failed for ${files[index].name}:`,
        result.reason
      );
      // Return original file if promise was rejected
      return files[index];
    }
  });
}

/**
 * Check if the browser supports WebP format
 * @returns Promise that resolves to boolean indicating WebP support
 */
export function checkWebPSupport(): Promise<boolean> {
  return new Promise(resolve => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;

    // Add timeout to prevent hanging
    const timeoutId = setTimeout(() => {
      canvas.width = 0;
      canvas.height = 0;
      resolve(false);
    }, 5000);

    try {
      canvas.toBlob(blob => {
        clearTimeout(timeoutId);
        canvas.width = 0;
        canvas.height = 0;
        resolve(blob !== null);
      }, "image/webp");
    } catch (error) {
      clearTimeout(timeoutId);
      canvas.width = 0;
      canvas.height = 0;
      console.warn("WebP support check failed:", error);
      resolve(false);
    }
  });
}
