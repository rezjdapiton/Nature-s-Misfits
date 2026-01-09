const Listing = require("../models/Listing");
const User = require("../models/User");

exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find()
      .where("quantity").gt(0)
      .populate("sellerId", "fullName email");

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching listings", error: err });
  }
};

exports.searchListings = async (req, res) => {
  try {
    const keyword = req.query.q || "";

    const results = await Listing.find({
      quantity: { $gt: 0 },
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    }).populate("sellerId", "fullName email");

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Search failed", error: err });
  }
};
