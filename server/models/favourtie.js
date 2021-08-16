
const bookshelf = require('../bookshelf');
require('./art_work');
require('./user');

const Favourite = bookshelf.model('Favourite', {
  tableName: "favourites",
  // users() {
  //   return this.belongsTo('Users')
  // },
  art_works() {
    return this.belongsTo('Art_Work')
  },
});

module.exports = Favourite;