
exports.up = function (knex) {
  return knex.schema.createTable('cherry_blossoms', table => {
    table.string('id').primary();
    table.specificType('geom', 'integer ARRAY');             
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cherry_blossoms');
};