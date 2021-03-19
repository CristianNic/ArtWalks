
const bookshelf = require('../bookshelf');      
require('./favourtie');

const ArtWork = bookshelf.model('Art_Works', {
  tableName: "art_works",
  favourites () {
    return this.hasMany('Favourites');
  },
});

module.exports = ArtWork;


