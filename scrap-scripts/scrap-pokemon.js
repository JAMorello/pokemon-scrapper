const scrapPokemon = async (id, link, page) => {
  // This script scraps the info from a single pokemon

  await page.goto(link);

  // Initialize object
  const pokeData = {};

  // Pokemon Name
  pokeData.name = await page.$eval(".product_title", (el) => el.textContent);

  // Product data
  pokeData.id = id;
  pokeData.link = link;
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
  pokeData.img = await page.$eval(
    ".woocommerce-product-gallery__image img",
    (el) => el.src
  );
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
  pokeData.metadata.categories = await page.$$eval(".posted_in > a", (els) =>
    els.map((el) => el.textContent)
  );
  pokeData.metadata.tags = await page.$$eval(".tagged_as > a", (els) => {
    return els.map((el) => el.textContent);
  });

  return pokeData;
};

module.exports = { scrapPokemon };
