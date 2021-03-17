
exports.up = function (knex) {
  return knex.schema.createTable('neighbourhoods', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.specificType('geom', 'integer ARRAY'); 
    table.foreign('cherry_blossom_id').references(cherry_blossoms.id).notNullable();
    table.foreign('public_washroom_id').references(public_washrooms.id).notNullable();
    table.foreign('drinking_fountain_id').references(drinking_fountain.id).notNullable();               
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('neighbourhoods');
};