const puppeteer = require("puppeteer");
const { scrapPage } = require("./scrap-scripts/scrap-page");
const url = "https://scrapeme.live/shop/";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const data = await scrapPage(page);
  console.log(data);
  await browser.close();
})();
