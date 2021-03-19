
const bookshelf = require('../bookshelf');
require('./art_work');
require('./user');

const Favourite = bookshelf.model('Favourites', {
  tableName: "favourites",
  users() {
    return this.belongsTo('Users')
  },
  art_works() {
    return this.belongsTo('Art_Works')
  },
});

module.exports = Favourite;