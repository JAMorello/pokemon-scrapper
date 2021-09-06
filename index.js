const puppeteer = require("puppeteer");
const { scrapPokemon } = require("./scrap-scripts/scrap-pokemon");
const url = "https://scrapeme.live/shop/Bulbasaur/";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  const data = await scrapPokemon(page);
  console.log(data);
  await browser.close();
})();
