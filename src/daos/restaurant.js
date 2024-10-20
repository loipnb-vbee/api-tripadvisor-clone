const Restaurants = require("../models/restaurant");

const createRestaurant = async (restaurantData) => {
  try {
    const createRestaurant = await Restaurants.findOneAndUpdate(
      { locationId: restaurantData?.locationId },
      { $set: restaurantData },
      { new: true, upsert: true }
    );

    return createRestaurant;
  } catch (e) {
    console.error("Error upserting restaurant:", error);
  }
};

const createMultipleRestaurants = async (restaurants) => {
  try {
    await Promise.all(
      restaurants.map((restaurant) => createRestaurant(restaurant))
    );
    console.log("All restaurants processed:", restaurants.length);
  } catch (error) {
    console.error("Error processing restaurants:", error);
  }
};

module.exports = {
  createRestaurant,
  createMultipleRestaurants,
};
