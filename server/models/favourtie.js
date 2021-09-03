
const bookshelf = require('../bookshelf');
require('./art_work');
require('./user');

const Favourite = bookshelf.model('Favourite', {
  tableName: "favourites",
  art_works() {
    return this.belongsTo('Art_Work')
  },
});

module.exports = Favourite;