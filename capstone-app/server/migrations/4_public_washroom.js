
exports.up = function (knex) {
  return knex.schema.createTable('public_washrooms', table => {
    table.increments('id').primary();
    table.string('recordid').notNullable();
    table.string('summer_hours');
    table.string('winter_hours');
    table.string('geom');             
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('public_washrooms');
};