const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Favourite = require("../models/favourtie");
const ArtWorks = require("../models/art_work");

// Returns all users favourites, each user with favourite art_work id
router.route("/all_favourites").get((req, res) => {
	Favourite.where(req.query)
		.fetchAll({ withRelated: ["art_works"] })
		.then((favourites) => {
			res.status(200).json({ favourites });
			// filter data for one user
			// fav's . where (booshelf)
		});
});

module.exports = router;
