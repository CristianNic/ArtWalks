
exports.up = function (knex) {
  return knex.schema.createTable('cherry_blossoms', table => {
    table.increments('id').primary();
    table.string('recordid').notNullable();
    table.string('geom');             
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cherry_blossoms');
};