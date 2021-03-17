
exports.up = function (knex) {
  return knex.schema.createTable('favourites', table => {
    table.increments('id').primary();
    table.foreign('user_id').references(users.id).notNullable();
    table.foreign('art_work_id').references(art_works.id).notNullable();
    table.boolean('visited').notNullable();                 
  }); 
};

exports.down = function(knex) {
  return knex.schema.dropTable('favourites');
};
