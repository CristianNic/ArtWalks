
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());                
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('location_created_at');  
    table.string('location_current');
    table.string('profile_image_url');        
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
