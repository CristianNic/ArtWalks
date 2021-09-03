const express = require("express");
const router = express.Router();

const ArtWorks = require("../models/art_work");

// Get all Artworks
router.route("/").get((req, res) => {
	ArtWorks.where(req.query)
		.fetchAll({ withRealted: ["art_works"] })
		.then((art_works) => {
			res.status(200).json({ art_works });
		});
});

// Returns details for one artwork
router.route("/:id").get((req, res) => {
	ArtWorks.where(req.params)
		.fetchAll({ withRealted: ["artworks"] })
		.then((favourites) => {
			const filteredFavourites = favourites.models.filter(
				(model) => model.attributes.id == req.params.id
			);
			res.status(200).json(filteredFavourites[0]);
		});
});

// Get ArtWork by its City of Vancouver Registry ID
router.route("/registry_id/:registry_id").get((req, res) => {
	ArtWorks.where(req.params)
		.fetchAll({ withRealted: ["artworks"] })
		.then((favourites) => {
			const filteredFavourites = favourites.models.filter(
				(model) => model.attributes.registry_id == req.params.registry_id
			);
			res.status(200).json(filteredFavourites[0]);
		});
});

// Returns only by Neighbourhood
router.route("/neighbourhood/:neighbourhood").get((req, res) => {
	// console.log(req.params);
	ArtWorks.where({ neighbourhood: req.params.neighbourhood })
		.fetchAll()
		.then((neighbourhoods) => {
			const filteredneighbourhoods = neighbourhoods.models.filter(
				(model) =>
					model.attributes.neighbourhood.toLowerCase() ==
					req.params.neighbourhood.toLowerCase()
			);
			res.status(200).json(filteredneighbourhoods);
		});
});

// Returns only by Title
router.route("/title/:title").get((req, res) => {
	ArtWorks.where("title", "like", req.params.title)
		.fetchAll()
		.then((titles) => {
			console.log(req.params.title);
			const filteredtitles = titles.models.filter(
				(model) =>
					model.attributes.title.toLowerCase() == req.params.title.toLowerCase()
			);
			console.log(filteredtitles);
			res.status(200).json(filteredtitles);
		});
});

// Returns only by Artist
router.route("/artist/:artist").get((req, res) => {
	ArtWorks.where("artists_names", "like", req.params.artist)
		.fetchAll()
		.then((artists) => {
			console.log(req.params.artist);
			const filteredartists = artists.models.filter(
				(model) =>
					model.attributes.artists_names.toLowerCase() ==
					req.params.artist.toLowerCase()
			);
			console.log(filteredartists);
			res.status(200).json(filteredartists);
		});
});

// Returns only by Medium Type
router.route("/type/:type").get((req, res) => {
	ArtWorks.where("type", "like", req.params.type) // %word%  match antyhing %
		.fetchAll()
		.then((types) => {
			const filteredtypes = types.models.filter(
				(model) =>
					model.attributes.type.toLowerCase() == req.params.type.toLowerCase()
			);
			res.status(200).json(filteredtypes);
		});
});


module.exports = router;
