const bookshelf = require('../bookshelf');
require('./favourite');

const ArtWorks = bookshelf.model("Art_Works", {
  tableName: "art_works",
  inventories: function () {
    return this.hasMany("Inventory");
  },
});

module.exports = art_works;
