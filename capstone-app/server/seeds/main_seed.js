const artWorkData           = require("../seed_data/art_work");
const cherryBlossomData     = require("../seed_data/cherry_blossom");
const drinkingFountainData  = require("../seed_data/drinking_fountain");
const favouritesData        = require("../seed_data/favourites");
const neighbourhoodData     = require("../seed_data/neighbourhood");
const publicWashroomData    = require("../seed_data/public_washroom");
const usersData             = require("../seed_data/users");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("art_works")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("art_works").insert(artWorkData);
    })
    // next thing to do
    .then(() => {
      return knex("cherry_blossom")
        .del()
        .then(function () {
          return knex("cherry_blossom").insert(cherryBlossomData);
        })
    })
    .then(() => {
      return knex("drinking_fountain")
        .del()
        .then(function () {
          return knex("drinking_fountain").insert(drinkingFountainData);
        })
    })
    .then(() => {
      return knex("favourites")
        .del()
        .then(function () {
          return knex("favourites").insert(favouritesData);
        })
    })
    .then(() => {
      return knex("neighbourhood")
        .del()
        .then(function () {
          return knex("neighbourhood").insert(neighbourhoodData);
        })
    })
    .then(() => {
      return knex("public_washroom")
        .del()
        .then(function () {
          return knex("public_washroom").insert(publicWashroomData);
        })
    })
    .then(() => {
      return knex("users")
        .del()
        .then(function () {
          return knex("users").insert(usersData);
        })
    })
  };   
      
      
//     })
//     .then(() => {
//       return knex("inventories").del();
//     })
//     .then(() => {
//       // Inserts seed entries
//       return knex("warehouses")
//         .pluck("id")
//         .then((warehouseIds) => {
//           return warehouseIds;
//         });
//     })
//     .then((warehouseIds) => {
//       const inventoryDataWithWarehouseIds = inventoryData.map((inventory) => {
//         // inventory.warehouse_id =
//         //   warehouseIds[Math.floor(Math.random() * warehouseIds.length)];
//         return inventory;
//       });
//       return knex("inventories").insert(inventoryDataWithWarehouseIds);
//     });
// };





// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
        
//         // import a variable ... 

//       ]);
//     });
// };
