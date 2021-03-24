const express = require("express");
const router = express.Router();

// const Inventory = require("../models/inventory");
// const Warehouse = require("../models/warehouse");

const User = require("../models/user");
const Favourite = require("../models/favourtie");
const ArtWorks = require("../models/art_work");

// Get all Artworks
router.route("/").get((req, res) => {
	ArtWorks.where(req.query)
		.fetchAll({ withRealted: ["artworks"] })
		.then((art_works) => {
			res.status(200).json({ art_works });
		});
});

// Returns details for one artwork -->  RE-FACTOR ---> try geo only? /geo/:id  --> Details, Map PopUp details...
router.route("/:id").get((req, res) => {
	ArtWorks.where(req.params)
		.fetchAll({ withRealted: ["artworks"] })
		.then((favourites) => {
			console.log(favourites.models[0].attributes.geom); // all in filter table
			// try array method to search
			const filteredFavourites = favourites.models.filter(
				(model) => model.attributes.id == req.params.id
			);
			// const geomObj = { geom: filteredFavourites[0] }
			// res.status(200).json({ filteredFavourites })
			res.status(200).json(filteredFavourites[0]);
		});
});
/** 
// Get one artwork written shorter
// router.route("/test/:id").get((req, res) => {
// 	ArtWorks.fetchAll().then((art_works) => {
// 		res.status(200).json({ art_works });
// 	});
// });

// Get Geom of one artwork
// router.route('/geo/:id').get((req, res) => {
//   ArtWorks.where(req.query)
//     .fetchAll({ withRealted: ['artworks'] })
//     .then((favourites) => {
//       res.status(200).json({ favourites })
//     } )
// });
**/

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
	// artist = key
	// console.log(req.params);
	//ArtWorks.where({ artists_names: req.params.artist })
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
	ArtWorks.where("type", "like", req.params.type)
		.fetchAll()
		.then((types) => {
			const filteredtypes = types.models.filter(
				(model) =>
					model.attributes.type.toLowerCase() == req.params.type.toLowerCase()
			);
			res.status(200).json(filteredtypes);
		});
});

/* ================   Full Text Search   ==================================== 
const searchText = ` SELECT * FROM table_name WHERE MATCH(artist_statement)
                     AGAINST('search_terms' IN NATURAL LANGUAGE MODE)`;
// https://www.w3resource.com/mysql/mysql-full-text-search-functions.php
// Create full text index
// https://github.com/knex/knex/issues/203
// www.mysqltutorial.org/activating-full-text-searching.aspx/
// add index on .createTable() https://gist.github.com/cameronblandford/808ca0f66acffb8b50b4e3704d6063a1
// form query https://stackoverflow.com/questions/47987113/knex-like-query-dynamically-add
// Returns only by matching keywords in Artist Statements
router.route("/artist_statement/:statement").get((req, res) => {
	const test = req.params.statement;
	console.log(test);
	ArtWorks.where("artist_statement", "match", `%${req.params.statement}%`)
	// ArtWorks.whereRaw("id = ?", [1]) // select * from `users` where id = 1
	// ArtWorks.query(
	// 	"where",
	// 	"MATCH (artist_statement) AGAINST(" + test + ")"
	// )
	// ArtWorks.where("art_works.artist_statement LIKE ?", `${req.params.statement}`)
		.fetchAll()
		.then((statements) => {
			console.log(req.params.statement);
			const filteredstatements = statements.models.filter(
				(model) =>
					model.attributes.artist_statement.toLowerCase() ==
					req.params.statement.toLowerCase()
			);
			console.log(filteredstatements);
			res.status(200).json(filteredstatements);
		});
});
// Returns only by matching keywords in Work Description
router.route("/work_description/:desc").get((req, res) => {
	ArtWorks.where("work_description", "like", req.params.desc)
		.fetchAll()
		.then((descs) => {
			console.log(req.params.desc);
			const description = descs.models.filter(
				(model) =>
					model.attributes.work_description.toLowerCase() ==
					req.params.desc.toLowerCase()
			);
			console.log(description);
			res.status(200).json(description);
		});
});
======================================================================= */

// User can Search by:
// [x]title, [x]artist, [x]neighbourhood, [x]type, [ ] artist_statement-keywords (5 things)  // -->  any empty fields, either not included or returned last.
// Search for a word: ArtWorks.where(("columnName", "like", "%rowlikeme%"));
// Returns only by medium type [sculpture, ... ]
// router.route("/medium/:type").get((req, res) => {
// 	ArtWorks.where({ type: req.params.type })
// 		.fetchAll()
// 		.then((types) => {
// 			const filteredtypes = types.models.filter(
// 				(model) => model.attributes.type == req.params.type
// 			);
// 			res.status(200).json(filteredtypes);
// 		});
// });

// Get one ArtWork based on :id passed, for details page -->
router.route("/test/:id").get((req, res) => {
	ArtWorks.fetchAll().then((art_works) => {
		res.status(200).json({ art_works });
	});
});

module.exports = router;
