
const bookshelf = require('../bookshelf');
require('./art_work');
require('./user');

const Favourite = bookshelf.model('Favourites', {
  tableName: "favourites",
  inventories: function () {
    return this.hasMany('Users');
  },
});

const Favourite = bookshelf.model('Favourites', {
  tableName: "favourites",
  inventories: function () {
    return this.hasMany('Art_Works');
  },
});

module.exports = Favourite;