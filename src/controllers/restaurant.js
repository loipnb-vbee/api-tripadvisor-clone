const restaurantServiceCrawl = require("../services/crawlRestaurantsData");

const crawlRestaurantsData = async (req, res) => {
  const restaurantData = await restaurantServiceCrawl.crawlRestautantsData();
  return res.send(restaurantData);
};

module.exports = { crawlRestaurantsData };
