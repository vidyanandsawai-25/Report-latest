# Images Directory

Place your images here for the Maharashtra Water Billing System.

## Required Images:

### 1. **logo.png** (200x60px)
- Maharashtra Water Department logo
- Used in: Header, Sidebar
- Format: PNG with transparent background

### 2. **water-droplet-bg.png** (800x800px)
- Water droplet background/watermark
- Used in: Main app background
- Format: PNG, semi-transparent

### 3. **water-bill-bg.png** (1200x600px)
- Water bill background pattern
- Used in: Report cards, collection reports
- Format: PNG or JPG

## How to Use:

### In Next.js components:

```tsx
import Image from 'next/image';

// Example:
<Image 
  src="/assets/images/logo.png" 
  width={200} 
  height={60} 
  alt="Maharashtra Logo" 
  priority 
/>
```

### Path Structure:

```
public/
└── assets/
    └── images/
        ├── logo.png               ← Add here
        ├── water-droplet-bg.png   ← Add here
        └── water-bill-bg.png      ← Add here
```

## Temporary Placeholders:

If you don't have the images yet, placeholder utilities are available in:
- `/utils/imagePlaceholders.ts`

These generate SVG placeholders so you can start development immediately.

## Image Optimization:

Next.js automatically optimizes images:
- ✅ Converts to WebP format
- ✅ Lazy loads images
- ✅ Responsive sizing
- ✅ Blur placeholder

Just use the `<Image>` component from `next/image`.
