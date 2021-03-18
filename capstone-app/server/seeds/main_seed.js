const userData       = require("../seed_data/user");
const artWorkData    = require("../seed_data/art_work");
const favouritesData = require("../seed_data/favourites");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert(userData);
    })
    .then(() => {
      return knex("art_works")
        .del()
        .then(function () {
          return knex("art_works").insert(artWorkData);
        })
    })
    // .then(() => {
    //   return knex("favourites")
    //     .del()
    //     .then(function () {
    //       return knex("favourites").insert(favouritesData);
    //     })
    // })
    .then(() => {
      return knex("users")
        .pluck("id")
        .then((userIds) => {
          return userIds;
        // .then((userIds) => {
        //   console.log(userIds);
        });
    })
    .then((userIds) => {
      const favouritesDataWithUserIds = favouritesData.map((favourites) => {
        favourites.user_id = userIds
          // warehouseIds[Math.floor(Math.random() * warehouseIds.length)];
        return favourites;
      });
      return knex("favourites").insert(favouritesDataWithUserIds);
    });
};   
      
      
// Init File: 

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
