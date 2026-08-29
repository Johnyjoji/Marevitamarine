const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // iPhone 12 Pro viewport
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle2', timeout: 15000 });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: '/home/techowl/Projects/Marevitamarine/.claude/worktrees/premium-animations/screenshot-mobile.png', fullPage: false });
  console.log('Screenshot saved');
  await browser.close();
})();
