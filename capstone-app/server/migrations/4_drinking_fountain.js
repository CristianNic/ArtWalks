
exports.up = function (knex) {
  return knex.schema.createTable('drinking_fountains', table => {
    table.string('id').primary();
    table.string('summer_hours').notNullable();
    table.string('winter_hours').notNullable();
  //   table.specificType('geom', 'integer ARRAY');             
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('drinking_fountains');
};