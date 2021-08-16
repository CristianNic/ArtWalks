const userData = require("../seed_data/user");
const artWorkData = require("../seed_data/art_work");
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
    .then(() => {
      return knex("favourites")
        .del()
        .then(function () {
          return knex("favourites").insert(favouritesData);
        })
    })
};   
      


      

