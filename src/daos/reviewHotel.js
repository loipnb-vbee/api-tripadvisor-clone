const HotelReview = require("../models/hotelReview");

const createHotelReview = async (data) => {
  try {
    const createHotelReview = await HotelReview.findOneAndUpdate(
      { id: data?.id },
      { $set: data },
      { new: true, upsert: true }
    );
    return createHotelReview;
  } catch (e) {
    console.error("Error upserting hotel:", error);
  }
};

const createMultipleHotelReview = async (data) => {
  try {
    await Promise.all(
      data.map((hotelReview) => createHotelReview(hotelReview))
    );
    console.log("All hotel reviews processed:", data.length);
  } catch (error) {
    console.error("Error processing hotels:", error);
  }
};

module.exports = {
  createHotelReview,
  createMultipleHotelReview,
};
