import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

/**
 * Generate an optimized image URL from Sanity
 * Sanity's CDN automatically handles:
 * - Format conversion (WebP for modern browsers)
 * - Compression
 * - Resizing based on width parameter
 * - Quality optimization
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get optimized image URL for project cards (16:10 aspect ratio)
 * @param source - Sanity image source
 * @param width - Desired width in pixels (default: 1600)
 */
export function getCardImageUrl(
  source: SanityImageSource,
  width: number = 1600
): string {
  return urlFor(source)
    .width(width)
    .height(Math.round(width * 0.625)) // 16:10 ratio
    .quality(85)
    .auto("format")
    .url();
}

/**
 * Get optimized image URL for hero images (16:9 aspect ratio)
 * @param source - Sanity image source
 * @param width - Desired width in pixels (default: 1920)
 */
export function getHeroImageUrl(
  source: SanityImageSource,
  width: number = 1920
): string {
  return urlFor(source)
    .width(width)
    .height(Math.round(width * 0.5625)) // 16:9 ratio
    .quality(90)
    .auto("format")
    .url();
}

/**
 * Get optimized image URL for Open Graph/social sharing (1.91:1 aspect ratio)
 * Standard OG image size is 1200x630px
 * @param source - Sanity image source
 * @param width - Desired width in pixels (default: 1200)
 */
export function getOgImageUrl(
  source: SanityImageSource,
  width: number = 1200
): string {
  return urlFor(source)
    .width(width)
    .height(Math.round(width / 1.91)) // 1.91:1 ratio = 630px at 1200w
    .quality(85)
    .auto("format")
    .fit("crop")
    .url();
}

/**
 * Get optimized image URL with custom dimensions
 * @param source - Sanity image source
 * @param width - Desired width in pixels
 * @param height - Optional height in pixels
 * @param quality - Image quality 1-100 (default: 85)
 */
export function getOptimizedImageUrl(
  source: SanityImageSource,
  width: number,
  height?: number,
  quality: number = 85
): string {
  let imageBuilder = urlFor(source).width(width).quality(quality).auto("format");

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  return imageBuilder.url();
}
