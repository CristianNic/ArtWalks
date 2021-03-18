
exports.up = function (knex) {
  return knex.schema.createTable('art_works', table => {
    // table.increments('id').primary();
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
    
    // ---> remove notNullable ...
    //table.foreign('neighbourhood_id').references('neighbourhood.id').notNullable();
    // table.integer("warehouse_id").unsigned().notNullable().references("id").inTable("warehouses").onUpdate("CASCADE").onDelete("CASCADE");
    
    /// experiment ... 
    // table.integer('neighbourhood_id').unsigned().references('neighbourhoods.id');
   // ---> works ...  table.integer('neighbourhood_id').references('neighbourhoods.id');
    table.integer('neighbourhood_id').unsigned().notNullable().references('id').inTable('neighbourhoods');
     // .foreign('id').references('neighbourhoods.id');
    
    // table.integer('neighbourhood_id').unsigned()
    // table.foreign('neighbourhood_id').references('neighbourhoods.id')

    //table.foreign('neighbourhood_id').references('id').inTable('neighbourhoods').notNullable().onDelete('CASCADE').index()
      // .inTable("neighbourhoods").onUpdate("CASCADE").onDelete("CASCADE");
    
    // table.integer('id').unsigned().inTable("neighbourhoods")
    //   .references('id').onUpdate("CASCADE").onDelete("CASCADE");
    
   
    // table.integer('neighbourhood_id_FK').unsigned().notNullable();                      /// <------
    // table.foreign('neighbourhood_id_FK').references('id').inTable('neighbourhoods');

   // --->  table.string('location_on_site').notNullable();
   // table.specificType('geom', 'integer ARRAY');
    // --->  table.string('geom').notNullable();
    
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('art_works');
};