
exports.up = function (knex) {
  return knex.schema.createTable('favourites', table => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable()
         .references('id').inTable('users')
         .onUpdate("CASCADE").onDelete("CASCADE");
    table.integer('art_work_id').unsigned().notNullable()
         .references('id').inTable('art_works')
         .onUpdate("CASCADE").onDelete("CASCADE");
    table.boolean('visited').notNullable().defaultTo(false);                 
  }); 
};

exports.down = function(knex) {
  return knex.schema.dropTable('favourites');
};



