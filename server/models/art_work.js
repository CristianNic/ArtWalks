
const bookshelf = require('../bookshelf');      
require('./favourtie');

const ArtWork = bookshelf.model('Art_Work', {
  tableName: "art_works",
  favourites () {
    return this.hasOne('Favourite');
  },
});

module.exports = ArtWork;


