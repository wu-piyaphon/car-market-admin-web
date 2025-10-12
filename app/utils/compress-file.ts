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

  return new Promise(resolve => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.onload = () => {
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
          if (blob) {
            // Create filename with .webp extension
            const originalName = file.name.split(".").slice(0, -1).join(".");
            const webpFileName = `${originalName}.webp`;

            const compressedFile = new File([blob], webpFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            console.log(
              `Compressed ${file.name}: ${(file.size / 1024).toFixed(1)}KB → ${(blob.size / 1024).toFixed(1)}KB (${Math.round((1 - blob.size / file.size) * 100)}% reduction)`
            );
            resolve(compressedFile);
          } else {
            console.warn("WebP compression failed, using original file");
            resolve(file);
          }
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      console.warn("Failed to load image for compression, using original file");
      resolve(file);
    };

    // Load the image
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Compress multiple image files to WebP format
 * @param files - Array of files to compress
 * @param options - Compression options
 * @param onProgress - Optional progress callback
 * @returns Promise that resolves to array of compressed WebP Files
 */
export async function compressImages(
  files: File[],
  options: ImageCompressOptions = {},
  onProgress?: (current: number, total: number, fileName: string) => void
): Promise<File[]> {
  const results: File[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, files.length, file.name);

    try {
      const compressedFile = await compressImage(file, options);
      results.push(compressedFile);
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error);
      results.push(file); // Use original file if compression fails
    }
  }

  return results;
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

    canvas.toBlob(blob => resolve(blob !== null), "image/webp");
  });
}
