
const bookshelf = require('../bookshelf');      
require('./favourtie');

const User = bookshelf.model('Users', {
  tableName: "users",
  inventories: function () {
    return this.belongsTo('Favourites');
  },
});

module.exports = User;
