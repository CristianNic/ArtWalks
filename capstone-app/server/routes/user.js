const express = require("express");
const router = express.Router();

// const Inventory = require("../models/inventory");
// const Warehouse = require("../models/warehouse");

const User = require('../models/user');
const Favourite = require('../models/favourtie')
const ArtWorks = require('../models/art_work')

// Get all users
router.route('/').get((req, res) => {
  Favourite.where(req.query)
    .fetchAll({ withRealted: ['art_work'] })
    .then((favourites) => {
      res.status(200).json({ favourites })
    } )
});

// Gets the favourties 
router.route('/').get((req, res) => {
  Favourite.where(req.query)
    .fetchAll({ withRealted: ['art_work'] })
    .then((favourites) => {
      res.status(200).json({ favourites })
    } )
});


module.exports = router;