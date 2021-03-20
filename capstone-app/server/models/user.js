
const bookshelf = require('../bookshelf');      
require('./favourtie');

const User = bookshelf.model('User', {
  tableName: "users",
  favourites () {
    return this.hasMany('Favourite');
  },
});

module.exports = User;
