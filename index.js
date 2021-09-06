const puppeteer = require("puppeteer");
const fs = require("fs/promises");

const { scrapWebSite } = require("./scrap-scripts/scrap-website");
let url = "https://scrapeme.live/shop/page/";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const data = await scrapWebSite(url, page);
  const jsonData = JSON.stringify(data);
  await fs.writeFile("data.json", jsonData);
  await browser.close();
})();
