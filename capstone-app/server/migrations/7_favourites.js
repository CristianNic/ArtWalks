
exports.up = function (knex) {
  return knex.schema.createTable('favourites', table => {
    table.increments('id').primary();
    // table.foreign('user').references('id').notNullable();
    table.integer('user_id').unsigned().notNullable();
    table.foreign('user_id').references('id').inTable('users');
    table.integer('art_work_id').unsigned().notNullable();
    table.foreign('art_work_id').references('id').inTable('art_works');
    // table.foreign('art_work_id').references(art_works.id).notNullable();
    table.boolean('visited').notNullable().defaultTo(false);                 
  }); 
};

exports.down = function(knex) {
  return knex.schema.dropTable('favourites');
};



