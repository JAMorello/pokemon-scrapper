const { scrapPokemon } = require("./scrap-pokemon");

const scrapPage = async (page) => {
  // This script scraps data from a single page

  const pokemonList = [];

  const ids = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(
        ".button.product_type_simple.add_to_cart_button.ajax_add_to_cart"
      )
    ).map((el) => el.getAttribute("data-product_id"))
  );

  const links = await page.$$eval(
    ".woocommerce-LoopProduct-link.woocommerce-loop-product__link",
    (els) => els.map((el) => el.href)
  );

  for (let i = 0; i < links.length; i++) {
    pokemonList.push(await scrapPokemon(ids[i], links[i], page));
  }

  return pokemonList;
};

module.exports = { scrapPage };
