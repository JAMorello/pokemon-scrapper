const puppeteer = require("puppeteer");
const url = "https://scrapeme.live/shop/Bulbasaur/";

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // Initialize object
  const pokeData = {};

  // Pokemon Name
  pokeData.name = await page.$eval(".product_title", (el) => el.textContent);

  // Product data
  pokeData.price = await page.$eval(".price", (el) =>
    parseFloat(el.textContent.slice(1))
  );
  pokeData.currency = await page.$eval(".price", (el) =>
    el.textContent.slice(0, 1)
  );
  pokeData.stock_ammount = await page.$eval(".stock.in-stock", (el) =>
    parseInt(el.textContent.replace(" in stock", ""))
  );

  // Descriptions
  pokeData.product_detail = await page.$eval(
    ".woocommerce-product-details__short-description p",
    (el) => el.textContent
  );
  pokeData.product_description = await page.$eval(
    "#tab-description p",
    (el) => el.textContent
  );

  // Additional info
  pokeData.additional_info = {};
  pokeData.additional_info.weight = await page.$eval(
    ".product_weight",
    (el) => el.textContent
  );
  pokeData.additional_info.dimensions = await page.$eval(
    ".product_dimensions",
    (el) => el.textContent
  );

  // Metadata
  pokeData.metadata = {};
  pokeData.metadata.sku = await page.$eval(".sku", (el) =>
    parseInt(el.textContent)
  );
  pokeData.metadata.categories = await page.$$eval(".posted_in a", (els) =>
    els.map((el) => el.textContent)
  );
  pokeData.metadata.tags = await page.$$eval(".tagged_as a", (els) =>
    els.map((el) => el.textContent)
  );
  console.log(pokeData);
  await browser.close();
})();
