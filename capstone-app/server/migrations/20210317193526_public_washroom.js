
exports.up = function (knex) {
  return knex.schema.createTable('public_washrooms', table => {
    table.increments('id').primary();
    table.string('summer_hours').notNullable();
    table.string('winter_hours').notNullable();
    table.specificType('geom', 'integer ARRAY');             
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('public_washrooms');
};