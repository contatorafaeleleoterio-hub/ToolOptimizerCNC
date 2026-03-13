// scripts/generate-icons.mjs
// Generates favicon and app icons from logo_p_favcon.png
// Usage: node scripts/generate-icons.mjs

import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE = join(ROOT, 'logo_p_favcon.png');

async function main() {
  console.log('🔧 Generating icons from', SOURCE);

  // --- Web: public/ ---
  const webPublic = join(ROOT, 'public');
  mkdirSync(webPublic, { recursive: true });

  await sharp(SOURCE).resize(16, 16).png().toFile(join(webPublic, 'favicon-16x16.png'));
  console.log('  ✓ public/favicon-16x16.png');

  await sharp(SOURCE).resize(32, 32).png().toFile(join(webPublic, 'favicon-32x32.png'));
  console.log('  ✓ public/favicon-32x32.png');

  await sharp(SOURCE).resize(180, 180).png().toFile(join(webPublic, 'apple-touch-icon.png'));
  console.log('  ✓ public/apple-touch-icon.png');

  await sharp(SOURCE).resize(192, 192).png().toFile(join(webPublic, 'icon-192.png'));
  console.log('  ✓ public/icon-192.png');

  await sharp(SOURCE).resize(512, 512).png().toFile(join(webPublic, 'icon-512.png'));
  console.log('  ✓ public/icon-512.png');

  // favicon.ico multi-size for web (16 + 32 + 48)
  const icoWeb = await pngToIco([
    await sharp(SOURCE).resize(16, 16).png().toBuffer(),
    await sharp(SOURCE).resize(32, 32).png().toBuffer(),
    await sharp(SOURCE).resize(48, 48).png().toBuffer(),
  ]);
  writeFileSync(join(webPublic, 'favicon.ico'), icoWeb);
  console.log('  ✓ public/favicon.ico (16+32+48px)');

  // --- Desktop: Sistema_Desktop_Pen_driver/public/ ---
  const desktopPublic = join(ROOT, 'Sistema_Desktop_Pen_driver', 'public');
  mkdirSync(desktopPublic, { recursive: true });

  await sharp(SOURCE).resize(16, 16).png().toFile(join(desktopPublic, 'favicon-16x16.png'));
  console.log('  ✓ Sistema_Desktop_Pen_driver/public/favicon-16x16.png');

  await sharp(SOURCE).resize(32, 32).png().toFile(join(desktopPublic, 'favicon-32x32.png'));
  console.log('  ✓ Sistema_Desktop_Pen_driver/public/favicon-32x32.png');

  await sharp(SOURCE).resize(180, 180).png().toFile(join(desktopPublic, 'apple-touch-icon.png'));
  console.log('  ✓ Sistema_Desktop_Pen_driver/public/apple-touch-icon.png');

  const icoDesktop = await pngToIco([
    await sharp(SOURCE).resize(16, 16).png().toBuffer(),
    await sharp(SOURCE).resize(32, 32).png().toBuffer(),
    await sharp(SOURCE).resize(48, 48).png().toBuffer(),
  ]);
  writeFileSync(join(desktopPublic, 'favicon.ico'), icoDesktop);
  console.log('  ✓ Sistema_Desktop_Pen_driver/public/favicon.ico (16+32+48px)');

  // --- Desktop: Sistema_Desktop_Pen_driver/build/icon.ico (Electron app icon) ---
  const desktopBuild = join(ROOT, 'Sistema_Desktop_Pen_driver', 'build');
  mkdirSync(desktopBuild, { recursive: true });

  // Electron icon: 16 + 32 + 48 + 256px (covers taskbar, Explorer, shortcuts)
  const icoElectron = await pngToIco([
    await sharp(SOURCE).resize(16, 16).png().toBuffer(),
    await sharp(SOURCE).resize(32, 32).png().toBuffer(),
    await sharp(SOURCE).resize(48, 48).png().toBuffer(),
    await sharp(SOURCE).resize(256, 256).png().toBuffer(),
  ]);
  writeFileSync(join(desktopBuild, 'icon.ico'), icoElectron);
  console.log('  ✓ Sistema_Desktop_Pen_driver/build/icon.ico (16+32+48+256px)');

  console.log('\n✅ All icons generated successfully!');
}

main().catch((err) => {
  console.error('❌ Error generating icons:', err);
  process.exit(1);
});
