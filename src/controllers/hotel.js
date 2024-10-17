const hotelService = require("../services/crawlHotelsData");

const crawlHotelsData = async (req, res) => {
  const hotels = await hotelService.crawlHotelsData();
  return res.send(hotels);
};

module.exports = { crawlHotelsData };
