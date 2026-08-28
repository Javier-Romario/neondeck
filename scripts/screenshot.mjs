import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('docs/screenshots');
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

async function shot(page, file, opts = {}) {
  await page.screenshot({ path: path.join(OUT, file), ...opts });
  console.log('saved', file);
}

// --- Next kitchen sink ---
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(1600);
await shot(page, 'hero.png');

await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.1));
await page.waitForTimeout(900);
await shot(page, 'components.png');

// --- mobile ---
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await mobile.waitForTimeout(1400);
await shot(mobile, 'mobile.png');

// --- Ladle playground ---
const ladle = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await ladle.goto('http://localhost:61000/?story=ticker-board--wrapped-card', { waitUntil: 'networkidle' });
await ladle.waitForTimeout(1800);
await shot(ladle, 'ladle.png');

await browser.close();
console.log('done');
