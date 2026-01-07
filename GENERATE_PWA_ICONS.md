# Quick PWA Icon Generation Guide

Since we can't run image generation directly, here are the options to create PWA icons:

## Option 1: Use Online Tool (Easiest)

### PWA Icon Generator:
1. Visit: https://www.pwabuilder.com/imageGenerator
2. Upload a base image (logo/icon)
3. Generate all sizes automatically
4. Download and extract to `public/icons/`

### Alternative Tools:
- https://realfavicongenerator.net/
- https://favicon.io/
- https://www.favicon-generator.org/

## Option 2: Use Local HTML Generator

1. Open `public/icons/generate-icons.html` in your browser
2. Canvas elements will show with icons
3. Right-click each canvas
4. Select "Save image as..."
5. Save as `icon-[size]x[size].png` in `public/icons/`

**Required Sizes:**
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Option 3: Use ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Create base icon (512x512)
# Then resize for all sizes

convert base-icon.png -resize 72x72 public/icons/icon-72x72.png
convert base-icon.png -resize 96x96 public/icons/icon-96x96.png
convert base-icon.png -resize 128x128 public/icons/icon-128x128.png
convert base-icon.png -resize 144x144 public/icons/icon-144x144.png
convert base-icon.png -resize 152x152 public/icons/icon-152x152.png
convert base-icon.png -resize 192x192 public/icons/icon-192x192.png
convert base-icon.png -resize 384x384 public/icons/icon-384x384.png
convert base-icon.png -resize 512x512 public/icons/icon-512x512.png
```

## Option 4: Use Node.js Script

Create `generate-icons.js`:

```javascript
const sharp = require('sharp');
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Your base SVG or PNG
const baseIcon = 'base-icon.png';

sizes.forEach(size => {
  sharp(baseIcon)
    .resize(size, size)
    .toFile(`public/icons/icon-${size}x${size}.png`)
    .then(() => console.log(`Generated ${size}x${size}`));
});
```

Run: `npm install sharp && node generate-icons.js`

## Temporary Solution

For testing, you can use placeholder icons:

1. Create a simple 512x512 image with blue background
2. Add text "QUEUE" in the center
3. Use Option 1 (online tool) to generate all sizes

## Verify Installation

After generating icons, check:
- All 8 icon files exist in `public/icons/`
- File names match manifest.json
- Icons are square (width = height)
- PNG format
- Transparent or solid background

The PWA will work even without perfect icons, but they improve the user experience.

