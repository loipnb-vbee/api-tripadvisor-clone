const router = require("express").Router();
const asyncMiddleware = require("../middlewares/async");
// const { auth } = require('../middlewares/auth');
// const { loginValidate, registerValidate } = require('../validations/auth');
const restaurantController = require("../controllers/restaurant");

/* eslint-disable prettier/prettier */
router.get("/crawlRestaurantData", asyncMiddleware(restaurantController.crawlRestaurantsData))
/* eslint-enable prettier/prettier */

module.exports = router
  