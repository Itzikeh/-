import puppeteer from 'puppeteer-core';

const browserWSEndpoint = 'wss://brd-customer-hl_ff473d9e-zone-scraping_browser1:1107w17z38ha@brd.superproxy.io:9222';

async function run() {
  try {
    const browser = await puppeteer.connect({
      browserWSEndpoint,
      defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto('https://www.google.com/search?q=חנוך+לופו+site:linkedin.com');

    const links = await page.$$eval('a', as =>
      as.map(a => a.href).filter(href => href.includes('linkedin.com/in'))
    );

    console.log('🔗 לינק ראשון שנמצא:', links[0] || 'לא נמצאה תוצאה.');

    await browser.close();
  } catch (err) {
    console.error('❌ שגיאה:', err.message);
  }
}

run();
