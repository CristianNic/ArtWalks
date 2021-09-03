const express = require("express");
const router = express.Router();

const Favourite = require("../models/favourtie");

// Returns all users favourites, each user with favourite art_work id
router.route("/all_favourites").get((req, res) => {
	Favourite.where(req.query)
		.fetchAll({ withRelated: ["art_works"] })
		.then((favourites) => {
			res.status(200).json({ favourites });
		});
});

module.exports = router;
