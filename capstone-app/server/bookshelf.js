const knex = require("knex")(require("./knexfile_original"));
const bookshelf = require("bookshelf")(knex);

module.exports = bookshelf;