const { scrapPage } = require("./scrap-page");

const scrapWebSite = async (url, page) => {
  let completeData = [];
  let nextExist = true;
  let nextUrl = url;

  while (nextExist) {
    try {
      // await page.goto(nextUrl);
      console.log(nextUrl);
      // completeData = completeData.concat(await scrapPage(page));

      try {
        nextUrl = await page.evaluate(() =>
          document.querySelector(".next.page-numbers")
        );

        console.log(nextUrl);
        nextExist = false;
      } catch (e) {
        console.log(e.message);
        nextExist = false;
      }
    } catch (e) {
      console.log("Error in " + nextUrl);
      console.log(e.message);
    }
  }

  return completeData;
};

module.exports = { scrapWebSite };
