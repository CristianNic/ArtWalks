
exports.up = function (knex) {
  return knex.schema.createTable('art_works', table => {
    // table.increments('id').primary();
    table.string('recordid').primary();
      //  table.increments('recordid').primary();
      //  table.string('sitename').notNullable();
    table.string('status').notNullable();
    // table.int('year_of_installation').notNullable();
    // table.string('url').notNullable();

    // table.string('url_photo').notNullable();
    // table.string('photo_credits').notNullable();
    // table.int('registry_id').notNullable();
    // table.string('primary_material').notNullable();
    // table.string('type').notNullable();
    // table.string('ownership').notNullable();
    // table.string('artists').notNullable();
    // table.string('artists_url').notNullable();
    // table.string('site_address').notNullable();
    // table.string('neighbourhood').notNullable();
    
    // ---> remove notNullable ...
    
    //table.foreign('neighbourhood_id').references('neighbourhood.id').notNullable();
    // table.integer("warehouse_id").unsigned().notNullable().references("id").inTable("warehouses").onUpdate("CASCADE").onDelete("CASCADE");
    
    // ---- > table.integer("neighbourhood_id").unsigned().notNullable().references('id').inTable("neighbourhoods").onUpdate("CASCADE").onDelete("CASCADE");
    
    // table.integer('neighbourhood_id_FK').unsigned().notNullable();                      /// <------
    // table.foreign('neighbourhood_id_FK').references('id').inTable('neighbourhoods');

    // --- > table.string('location_on_site').notNullable();
   // table.specificType('geom', 'integer ARRAY');
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('art_works');
};