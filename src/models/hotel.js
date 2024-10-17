const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    hotelResultKey: String,
    locationId: Number,
    location: {
      url: String,
      reviewSummary: Object,
      thumbnail: Object,
      businessAdvantageSubscriptions: Object,
      locationV2: Object,
      accommodationCategory: Object,
      detail: Object,
      countryId: Number,
    },
    resultDetail: Object,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("hotel", hotelSchema);
