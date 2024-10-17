const { ObjectId } = require("mongoose").Types;
const Hotel = require("../models/hotel");

const createHotel = async (hotelData) => {
  try {
    const createHotel = await Hotel.findOneAndUpdate(
      { hotelResultKey: hotelData?.hotelResultKey },
      { $set: hotelData },
      { new: true, upsert: true }
    );
    return createHotel;
  } catch (e) {
    console.error("Error upserting hotel:", error);
  }
};

const createMultipleHotels = async (hotels) => {
  try {
    // const hotelDelete = await Hotel.deleteMany({
    //   "resultDetail.merchandisingLabels.id": "SPONSORED",
    // });
    await Promise.all(hotels.map((hotel) => createHotel(hotel)));
    console.log("All hotels processed:", hotels.length);
  } catch (error) {
    console.error("Error processing hotels:", error);
  }
};

const deleteHotel = async ({}) => {};

const findHotel = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const hotel = await Hotel.findById(condition).lean();
    return hotel;
  }

  if (typeof condition === "object" && condition !== null) {
    const hotel = await Hotel.findOne(condition).lean();
    console.log("check condition");
    return hotel;
  }

  return null;
};

const findAllHotel = async () => {
  const hotels = await Hotel.find().lean();

  return hotels;
};

const updateHotel = async (condition, data) => {
  const hotel = await Hotel.findOneAndUpdate(condition, data, {
    new: true,
  }).lean();
  return hotel;
};

const findRankingHotel = async ({}) => {};

const createUser = async ({ email, name, password }) => {
  const user = await User.create({ email, name, password });
  return user;
};

module.exports = {
  createHotel,
  createMultipleHotels,
  findHotel,
  findAllHotel,
  updateHotel,
};
