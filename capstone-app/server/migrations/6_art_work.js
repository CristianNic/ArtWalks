
exports.up = function (knex) {
  return knex.schema.createTable('art_works', table => {
    table.increments('id').primary();
    table.string('recordid');
    table.string('sitename').notNullable();
    table.string('status').notNullable();
    table.string('year_of_installation').notNullable();
    table.string('url').notNullable();
    table.string('url_photo').notNullable();
    table.string('photo_credits').notNullable();
    table.integer('registry_id');
    table.string('primary_material').notNullable();
    table.string('type').notNullable();
    table.string('ownership').notNullable();
    table.string('artists').notNullable();
    table.string('artists_url').notNullable();
    table.string('site_address').notNullable();
    table.string('neighbourhood').notNullable();
    table.integer('neighbourhood_id').unsigned().notNullable()
         .references('id').inTable('neighbourhoods')
         .onUpdate("CASCADE").onDelete("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('art_works');
};