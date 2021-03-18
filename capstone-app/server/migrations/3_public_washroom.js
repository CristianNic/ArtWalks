
exports.up = function (knex) {
  return knex.schema.createTable('public_washrooms', table => {
    table.string('id').primary();
    table.string('summer_hours');
    table.string('winter_hours');
    // table.specificType('geom', 'integer ARRAY');             
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('public_washrooms');
};