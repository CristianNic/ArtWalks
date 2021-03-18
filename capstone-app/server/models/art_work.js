
const bookshelf = require('../bookshelf');      
require('./favourtie');

const ArtWork = bookshelf.model('Art_Works', {
  tableName: "art_works",
  inventories: function () {
    return this.belongsTo('Favourites');
  },
});

module.exports = ArtWork;


