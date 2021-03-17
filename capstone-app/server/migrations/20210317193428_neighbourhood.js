
exports.up = function (knex) {
  return knex.schema.createTable('neighbourhoods', table => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.specificType('geom', 'integer ARRAY'); 
    // table.foreign('cherry_blossom_id').references('cherry_blossoms.id').notNullable();

    table.integer('cherry_blossom_id_FK').unsigned().notNullable();                      /// <------ 
    table.foreign('cherry_blossom_id_FK').references('id').inTable('cherry_blossoms');

    // table.foreign('public_washroom_id').references('public_washrooms.id').notNullable();

    table.integer('public_washroom_id_FK').unsigned().notNullable();                      /// <------ 
    table.foreign('public_washroom_id_FK').references('id').inTable('public_washrooms');

    //table.foreign('drinking_fountain_id').references('drinking_fountain.id').notNullable();
    
    table.integer('drinking_fountain_id_FK').unsigned().notNullable();                      /// <------ 
    table.foreign('drinking_fountain_id_FK').references('id').inTable('drinking_fountains');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('neighbourhoods');
};