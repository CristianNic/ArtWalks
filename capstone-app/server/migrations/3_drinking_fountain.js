
exports.up = function (knex) {
  return knex.schema.createTable('drinking_fountains', table => {
    table.increments('id').primary();
    table.string('recordid').notNullable();
    table.string('summer_hours').notNullable();
    table.string('winter_hours').notNullable();
    table.string('in_operation').notNullable();
    table.string('geom');             
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('drinking_fountains');
};