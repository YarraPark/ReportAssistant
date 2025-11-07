import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const sizes = [
  { width: 32, height: 32, output: 'client/public/favicon-32x32.png' },
  { width: 16, height: 16, output: 'client/public/favicon-16x16.png' },
  { width: 180, height: 180, output: 'client/public/apple-touch-icon.png' },
];

// Read the SVG file
const svgPath = 'client/public/favicon.svg';
const svgContent = fs.readFileSync(svgPath, 'utf8');

console.log('Generating favicons from favicon.svg...\n');

for (const size of sizes) {
  try {
    // Render SVG to PNG at specified size
    const resvg = new Resvg(svgContent, {
      fitTo: {
        mode: 'width',
        value: size.width,
      },
    });

    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    // Write the PNG file
    fs.writeFileSync(size.output, pngBuffer);

    console.log(`✓ Created ${size.output} (${size.width}x${size.height})`);
  } catch (error) {
    console.error(`✗ Failed to create ${size.output}:`, error.message);
  }
}

console.log('\nFavicon generation complete!');
