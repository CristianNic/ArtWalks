const express = require("express");
const router = express.Router();

const User = require('../models/user');
const Favourite = require('../models/favourtie')
const ArtWorks = require('../models/art_work')

// Get all users favourties 
// router.route('/').get((req, res) => {
//   Favourite.where(req.query)
//     .fetchAll({ withRelated: ['art_works'] })
//     .then((favourites) => {
//       res.status(200).json({ favourites })

//       // filter data for one user 

//       // fav's . where (booshelf) 

//     } )
// });

// Get 




// Not good--> Gets users lis with the word favourites at the top...
// {"favourites": [{"id": 1, "user_id": 1,"art_work_id": 1,"visited": 0},
// router.route('/').get((req, res) => {
//   Favourite.where(req.query)
//     .fetchAll({ withRealted: ['art_work'] })
//     .then((favourites) => {
//       res.status(200).json({ favourites })
//     } )
// });


module.exports = router;