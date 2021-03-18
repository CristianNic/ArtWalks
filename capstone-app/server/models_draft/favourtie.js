const bookshelf = require("../bookshelf");
require("./models_notes");

const ArtWorks = bookshelf.model("Art_Works", {
  tableName: "art_works",
  inventories: function () {
    return this.hasMany("Inventory");
  },
});

module.exports = art_works;
