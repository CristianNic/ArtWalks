const express = require("express");
const router = express.Router();

// const Inventory = require("../models/inventory");
// const Warehouse = require("../models/warehouse");

const User = require('../models/user');
const Favourite = require('../models/favourtie')
const ArtWorks = require('../models/art_work')

// Get all artworks
router.route('/').get((req, res) => {
  ArtWorks.where(req.query)
    .fetchAll({ withRealted: ['artworks'] })
    .then((art_works) => {
      res.status(200).json({ art_works })
    } )
});
// Get all Geo of one artwork
// Get one artwork by ID ...Pages --> Details, Map PopUp details...  

router.route('/geo/:id').get((req, res) => {
  ArtWorks.where(req.params)
    .fetchAll({ withRealted: ['artworks'] })
    .then((favourites) => {
      console.log(favourites.models[0].attributes.geom) // all in filter table 
      // try array method to search 
      const filteredFavourites = favourites.models.filter((model) => 
        model.attributes.id == req.params.id)
      // const geomObj = { geom: filteredFavourites[0] }
     // res.status(200).json({ filteredFavourites })
      res.status(200).json(filteredFavourites[0])
    } )
});

// Get all Artworks --> 
router.route('/test').get((req, res) => {
  ArtWorks
    .fetchAll()
    .then((artworks) => {
      res.status(200).json({ artworks });
    });
});


// Get Geom of one artwork 
// router.route('/geo/:id').get((req, res) => {
//   ArtWorks.where(req.query)
//     .fetchAll({ withRealted: ['artworks'] })
//     .then((favourites) => {
//       res.status(200).json({ favourites })
//     } )
// });





module.exports = router;



