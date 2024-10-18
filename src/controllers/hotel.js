const hotelService = require("../services/crawlHotelsData");
const hotelServiceCrawlReview = require("../services/crawlReviewsHotel");

const crawlHotelsData = async (req, res) => {
  const hotels = await hotelService.crawlHotelsData();
  return res.send(hotels);
};

const crawlReviewsHotel = async (req, res) => {
  const reviewHotels = await hotelServiceCrawlReview.crawlReviewsHotel();
  return res.send(reviewHotels);
};

module.exports = { crawlHotelsData, crawlReviewsHotel };
