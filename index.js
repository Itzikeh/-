import { BrightDataMCP } from '@brightdata/mcp';

const mcp = new BrightDataMCP({
  username: 'brd-customer-hl_ff473d9e-zone-scraping_browser1',
  password: '1107w17z38ha',
  zone: 'scraping_browser1'
});

async function run() {
  try {
    const browser = await mcp.createBrowserSession();
    const page = await browser.newPage();

    await page.goto("https://www.google.com/search?q=חנוך+לופו+site:linkedin.com");

    const links = await page.$$eval('a', as =>
      as.map(a => a.href).filter(href => href.includes('linkedin.com/in'))
    );

    console.log("🔗 לינק ראשון שנמצא:", links[0] || "לא נמצא לינק.");
    await browser.close();
  } catch (err) {
    console.error("❌ שגיאה:", err.message);
  }
}

run();
