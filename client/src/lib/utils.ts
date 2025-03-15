import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format price from cents to dollars with proper formatting
export function formatPrice(priceInCents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(priceInCents / 100);
}

// Format CO2 saved
export function formatCO2(grams: number): string {
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(1)}kg`;
  }
  return `${grams}g`;
}

// Generate a star rating display - returns an array of elements for star ratings
export function generateStarRating(rating: number): Array<{ type: string }> {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push({ type: "full" });
  }

  // Add half star if needed
  if (hasHalfStar) {
    stars.push({ type: "half" });
  }

  // Add empty stars to reach 5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push({ type: "empty" });
  }

  return stars;
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Get category label from value
export function getCategoryLabel(categoryValue: string): string {
  const categories = {
    'thrift': 'Thrifted',
    'rental': 'Rental',
    'upcycled': 'Upcycled'
  };
  return categories[categoryValue as keyof typeof categories] || categoryValue;
}

// Calculate discount percentage
export function calculateDiscountPercentage(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

// Extract image ID from Unsplash URL for optimization
export function extractUnsplashId(url: string): string | null {
  const regex = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// Get optimized image URL with proper sizing
export function getOptimizedImageUrl(url: string, width: number = 400): string {
  const unsplashId = extractUnsplashId(url);
  if (unsplashId) {
    return `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=${width}&q=80`;
  }
  return url;
}
