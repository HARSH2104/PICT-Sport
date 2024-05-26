const express = require("express");

const router = express.Router();

const bookingController = require("../controllers/bookingController");

router.get("/getAllBookings", bookingController.getAllBookings);
router.get("/getBookingsByUidItem", bookingController.getBookingByUidItemId);
router.get("/getUserBooking/:id", bookingController.getUserBookings);

module.exports = router;
