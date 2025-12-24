/**
 * Image Placeholders Utility
 * Provides placeholder images when Figma assets are not available
 * For production, replace these with actual images in /public/assets/images/
 */

/**
 * Generate a placeholder image data URL
 */
function generatePlaceholder(width: number, height: number, text: string, bgColor: string = '#005AA7'): string {
  // Create SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#00C6FF;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" opacity="0.1"/>
      <text 
        x="50%" 
        y="50%" 
        font-family="Arial, sans-serif" 
        font-size="14" 
        fill="#005AA7" 
        text-anchor="middle" 
        dominant-baseline="middle"
        opacity="0.5"
      >
        ${text}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Logo placeholder (200x60)
 */
export const logoPlaceholder = generatePlaceholder(
  200, 
  60, 
  'Maharashtra Water Billing Logo',
  '#005AA7'
);

/**
 * Water droplet background placeholder (800x800)
 */
export const waterDropletPlaceholder = generatePlaceholder(
  800,
  800,
  'Water Droplet Background',
  '#E0F2FE'
);

/**
 * Water bill background placeholder (1200x600)
 */
export const waterBillBgPlaceholder = generatePlaceholder(
  1200,
  600,
  'Water Bill Background Pattern',
  '#F0F9FF'
);

/**
 * Get image source - tries to load from public folder, falls back to placeholder
 */
export function getImageSrc(imageName: string, placeholder: string): string {
  // In production, images should be in /public/assets/images/
  // For now, return placeholder
  
  // Check if running in browser
  if (typeof window !== 'undefined') {
    // Try to load from public folder first
    const publicPath = `/assets/images/${imageName}`;
    
    // Return public path if available, otherwise placeholder
    // Note: This is a simple approach. In production, you'd want proper error handling
    return publicPath;
  }
  
  return placeholder;
}

/**
 * Image sources with fallbacks
 */
export const images = {
  logo: logoPlaceholder,
  waterDropletBg: waterDropletPlaceholder,
  waterBillBg: waterBillBgPlaceholder,
};

/**
 * Instructions for production use:
 * 
 * 1. Create folder: /public/assets/images/
 * 
 * 2. Add these images:
 *    - logo.png (200x60px) - Maharashtra Water Department logo
 *    - water-droplet-bg.png (800x800px) - Watermark background
 *    - water-bill-bg.png (1200x600px) - Background pattern
 * 
 * 3. Update imports in components to use:
 *    import { images } from '../utils/imagePlaceholders';
 *    <img src={images.logo} alt="Logo" />
 * 
 * 4. Or use Next.js Image component:
 *    import Image from 'next/image';
 *    <Image src="/assets/images/logo.png" width={200} height={60} alt="Logo" />
 */

export default images;
