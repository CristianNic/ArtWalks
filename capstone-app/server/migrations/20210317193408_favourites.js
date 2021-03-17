
exports.up = function (knex) {
  return knex.schema.createTable('favourites', table => {
    table.increments('id').primary();
    // table.foreign('user').references('id').notNullable();
    table.integer('id_FK').unsigned().notNullable();
    table.foreign('id_FK').references('id').inTable('users');
    // table.foreign('art_work_id').references(art_works.id).notNullable();
    // table.boolean('visited').notNullable().defaultTo(false);                 
  }); 
};

exports.down = function(knex) {
  return knex.schema.dropTable('favourites');
};



