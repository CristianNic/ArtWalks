   const express = require("express");
   const Warehouse = require("../models/warehouse");
   const router = express.Router();
 
   router
   .route("/")   // pass user id 
   .get((req, res) => {   // pass it in here 
       Warehouse.where(req.query)
       .fetchAll({ withRelated: ["inventories"] })
       .then(warehouses => {
           res.status(200).json(warehouses);
       });
   })

   // this will return a list of favourites + artworks? 