const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    locationId: Number,
    name: String,
    detailPageRoute: Object,
    location: Object,
    menu: Object,
    offers: Object,
    cuisines: Object,
    establishmentTypes: Object,
    priceTypes: Object,
    openHours: Object,
    reviewSummary: Object,
    thumbnail: Object,
    taLocation: Object,
    reviewSnippetsV2: Object,
    storyboardStatus: Boolean,
    isPremium: Boolean,
    isLocalChef: Boolean,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("restaurant", restaurantSchema);
