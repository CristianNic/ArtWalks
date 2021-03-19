
const bookshelf = require('../bookshelf');      
require('./favourtie');

const User = bookshelf.model('Users', {
  tableName: "users",
  favourites () {
    return this.hasMany('Favourites');
  },
});

module.exports = User;
