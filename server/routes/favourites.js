const express = require("express");
const router = express.Router();

const Favourite = require("../models/favourtie");

// Returns all users favourties (Could be used to create most popular/visited ranking)
router.route("/").get((req, res) => {
	Favourite.where(req.query)
		.fetchAll({ withRelated: ["art_works"] })
		.then((favourites) => {
			res.status(200).json({ favourites });
		});
});

// Get favourties for one user
router.route("/:user_id").get((req, res) => {
	console.log(req.params);
	Favourite.where({ user_id: req.params.user_id })
		.fetchAll({ withRelated: ["art_works"] })
		.then((favourites) => {
			res.status(200).json(favourites);
		});
});

// Add art work to favourties for one user
router.route("/:user_id/:art_work").post((req, res) => {
	console.log(req.params);
	new Favourite({
		user_id: req.params.user_id,
		art_work_id: req.params.art_work,
		visited: false,
	})
		.save()
		.then(function (result) {
			res.json({ success: true, added: req.params });
		});
});

router.route("/:user_id/remove/:art_work").delete((req, res) => {
	console.log(req.params);
	Favourite.where({ user_id: req.params.user_id } && { art_work_id: req.params.art_work })
		.destroy()
		.then((result) => {
			res.json({ success: true, removed: req.params });
		})
		.catch((error) => {
			res.status(200).json({ message: "already removed" });
		});
});

module.exports = router;
