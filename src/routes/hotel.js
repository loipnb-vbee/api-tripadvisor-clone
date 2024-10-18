const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
// const { auth } = require('../middlewares/auth');
// const { loginValidate, registerValidate } = require('../validations/auth');
const hotelController = require("../controllers/hotel");

/* eslint-disable prettier/prettier */
router.get("/crawlHotelsData", asyncMiddleware(hotelController.crawlHotelsData))
router.get("/crawlReviewHotels", asyncMiddleware(hotelController.crawlReviewsHotel))
/* eslint-enable prettier/prettier */

module.exports = router
  