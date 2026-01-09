const express = require("express");
const router = express.Router();
const { getAllListings, searchListings } = require("../controllers/listingController");

// Get all listings
router.get("/", getAllListings);

// Search listings
router.get("/search", searchListings);

module.exports = router;
