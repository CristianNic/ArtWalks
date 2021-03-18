
exports.up = function (knex) {
  return knex.schema.createTable('neighbourhoods', table => {
    table.increments('id').primary();
    table.string('recordid');
    table.string('name').notNullable();
    table.integer('cherry_blossom_id').unsigned().notNullable()
         .references('id').inTable('cherry_blossoms')
         .onUpdate("CASCADE").onDelete("CASCADE");
    table.integer('drinking_fountain_id').unsigned().notNullable()
         .references('id').inTable('drinking_fountains')
         .onUpdate("CASCADE").onDelete("CASCADE");
    table.integer('public_washroom_id').unsigned().notNullable()
         .references('id').inTable('public_washrooms')
         .onUpdate("CASCADE").onDelete("CASCADE");
    table.string('geom'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('neighbourhoods');
};