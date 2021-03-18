// Add constraints --> https://www.w3schools.com/sql/sql_constraints.asp


const bookshelf = require("../bookshelf");        // <--- where does this file go ? 
require("./user");

const ArtWorks = bookshelf.model("Art_Works", {
  tableName: "art_works",
  inventories: function () {
    return this.hasMany("Inventory");
  },
});

module.exports = art_works;


/// =============================================
// One-to-many -- associations can be created with belongsTo, hasMany, morphMany / morphTo, and some of the through relation types.
const Book = bookshelf.model('Book', {
  tableName: 'books',
  pages() {                             // A Book has many pages 
    return this.hasMany('Page')         // so a book table can refer to many pages 
  }
})                                          // where does the FK and ... go?? 

const Page = bookshelf.model('Page', {   // A FOREIGN KEY is a field (or collection of fields) in one table, that refers to the PRIMARY KEY in another table.
  tableName: 'pages',
  book() {                              // a Page has only one book
    return this.belongsTo('Book')       // so a page table has only 1 book
  }
})

// One-to-many A Knex migration for the above relationship could be created with:
exports.up = function(knex) {
  return knex.schema
    .createTable('books', function (table) {
    table.increments('id').primary()
    table.string('name')
    })
    .createTable('pages', function (table) {
    table.increments('id').primary()
    table.string('content')
    table.integer('book_id').references('books.id')  // Foreign Key ...This way you open a book and enter in the FK for each page you want to see
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('books')
    .dropTable('pages')
}

/// =============================================
// One-to-one -- associations can be created with belongsTo, hasOne, and morphOne relation types.
const Book = bookshelf.model('Book', {
  tableName: 'books',
  summary() {
    return this.hasOne('Summary')    // <----- has one?  // (Target,[foreignKey],[foreignKey Target]) 
  }                                  // By default the foreign key is assumed to be the singular form of this model's tableName followed by _id
})

const Summary = bookshelf.model('Summary', {
  tableName: 'summaries',
  book() {
    return this.belongsTo('Book')     // <------ belongs to?
  }
})

// One-to-one A Knex migration for the above relationship could be created with:
exports.up = function(knex) {
  return knex.schema
    .createTable('books', function (table) {
    table.increments('id').primary()
    table.string('name')
  })
    .createTable('summaries', function (table) {
    table.increments('id').primary()
    table.string('details')
    table.integer('book_id').unique().references('books.id')   // <--- foreign key
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('books')
    .dropTable('summaries')
}
/// =============================================