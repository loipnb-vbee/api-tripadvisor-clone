const mongoose = require("mongoose");

const hotelReviewSchema = new mongoose.Schema(
  {
    id: Number,
    reviewDetailPageWrapper: Object,
    location: Object,
    createdDate: Date,
    publishedDate: Date,
    provider: Object,
    userProfile: Object,
    rating: Number,
    publishPlatform: String,
    title: String,
    language: String,
    originalLanguage: String,
    translationType: String,
    roomTip: String,
    tripInfo: Object,
    additionalRatings: Object,
    text: String,
    username: String,
    locationId: Number,
    mcid: Number,
    mtProviderId: Number,
    photos: Object,
    helpfulVotes: Number,
    labels: Object,
    alertStatus: Boolean,
    submissionDomain: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("hotelReview", hotelReviewSchema);
