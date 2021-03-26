const express = require("express");
const router = express.Router();

// ToDo: Handle an error 
const Favourite = require('../models/favourtie')

// Returns all users favourties (could use to create most popular/visited)
router.route('/').get((req, res) => {
  Favourite.where(req.query)
    .fetchAll({ withRelated: ['artworks'] })
    .then((favourites) => {
      res.status(200).json({ favourites })
    } )
});

// Get favourties for one user
router.route('/:user_id').get((req, res) => {
  console.log(req.params)
  Favourite.where({ user_id: req.params.user_id })
    .fetchAll({ withRelated: ['art_works'] })
    .then((favourites) => {
      res.status(200).json(favourites)
      // filter data for one user 
      // fav's . where (booshelf) 
    } )
});


module.exports = router;
