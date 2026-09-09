import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

console.log('Navigating to /about ...');
await page.goto('http://localhost:5180/about', { waitUntil: 'networkidle2', timeout: 30000 });
await new Promise(r => setTimeout(r, 1500));

// Capture initial viewport snapshot
const initialScreenshot = '/home/techowl/.claude-omniroute/jobs/479fdc0b/tmp/about_initial.png';
await page.screenshot({ path: initialScreenshot, fullPage: false });
console.log('Saved initial screenshot:', initialScreenshot);

// Inspect the page structure
const info = await page.evaluate(() => {
  const cards = document.querySelectorAll('[data-test-sticky-card]');
  return {
    cardCount: cards.length,
    bodyHeight: document.body.scrollHeight,
    viewportHeight: window.innerHeight,
  };
});
console.log('Page info:', info);

// Check for StackedCardSection by inspecting DOM directly
const stackInfo = await page.evaluate(() => {
  // Look for elements that are sticky and have h-screen
  const all = document.querySelectorAll('*');
  const results = [];
  for (const el of all) {
    const cs = window.getComputedStyle(el);
    if (cs.position === 'sticky') {
      const rect = el.getBoundingClientRect();
      results.push({
        tag: el.tagName,
        className: el.className?.toString().slice(0, 80) || '',
        top: cs.top,
        height: rect.height,
        offsetTop: el.offsetTop,
      });
    }
  }
  return results.slice(0, 20);
});
console.log('Sticky elements found:', stackInfo.length);
stackInfo.forEach((s, i) => console.log(`  [${i}] ${s.tag} top=${s.top} h=${s.height} class=${s.className}`));

// Now scroll down by one viewport height
console.log('\nScrolling 1 viewport down...');
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 1.0, behavior: 'instant' }));
await new Promise(r => setTimeout(r, 800));
const scroll1Shot = '/home/techowl/.claude-omniroute/jobs/479fdc0b/tmp/about_scroll1.png';
await page.screenshot({ path: scroll1Shot });
console.log('Saved scroll1 screenshot:', scroll1Shot);

const stackInfo2 = await page.evaluate(() => {
  const all = document.querySelectorAll('*');
  const results = [];
  for (const el of all) {
    const cs = window.getComputedStyle(el);
    if (cs.position === 'sticky') {
      const rect = el.getBoundingClientRect();
      results.push({
        top: Math.round(rect.top),
        height: Math.round(rect.height),
      });
    }
  }
  return results;
});
console.log('Sticky positions after scroll 1vh:');
stackInfo2.forEach((s, i) => console.log(`  [${i}] top=${s.top} h=${s.height}`));

// Scroll by another viewport
console.log('\nScrolling 2 viewports down...');
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 2.0, behavior: 'instant' }));
await new Promise(r => setTimeout(r, 800));
const scroll2Shot = '/home/techowl/.claude-omniroute/jobs/479fdc0b/tmp/about_scroll2.png';
await page.screenshot({ path: scroll2Shot });

const stackInfo3 = await page.evaluate(() => {
  const all = document.querySelectorAll('*');
  const results = [];
  for (const el of all) {
    const cs = window.getComputedStyle(el);
    if (cs.position === 'sticky') {
      const rect = el.getBoundingClientRect();
      results.push({
        top: Math.round(rect.top),
        height: Math.round(rect.height),
      });
    }
  }
  return results;
});
console.log('Sticky positions after scroll 2vh:');
stackInfo3.forEach((s, i) => console.log(`  [${i}] top=${s.top} h=${s.height}`));

// Scroll to a position where multiple cards should be visible if stacking
console.log('\nScrolling to deep position (3.5 viewports)...');
await page.evaluate(() => window.scrollTo({ top: window.innerHeight * 3.5, behavior: 'instant' }));
await new Promise(r => setTimeout(r, 800));
const scroll3Shot = '/home/techowl/.claude-omniroute/jobs/479fdc0b/tmp/about_scroll3.png';
await page.screenshot({ path: scroll3Shot });

await browser.close();
console.log('\nDone. Screenshots saved to /home/techowl/.claude-omniroute/jobs/479fdc0b/tmp/');
