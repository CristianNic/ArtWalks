
exports.up = function (knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamp('created_at').notNullable();                  // http://knexjs.org/#Schema-timestamp table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at');
    table.specificType('location_created_at', 'integer ARRAY');   // can be null, in case browser cannot retrive it, user can continue signing up 
    table.specificType('location_current', 'integer ARRAY');
    table.string('profile_image').notNullable();                  // link to img stored in app 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};


// https://stackoverflow.com/questions/50118196/how-to-insert-array-data-type-using-knex-and-potsgres
// You can directly pass javascript arrays to your ARRAYtype of columns. Like this:
// await knex.schema.createTable('foo', t => {
//   t.increments('id');
//   t.specificType('intarray', 'integer ARRAY');
//   t.specificType('stringarray', 'text ARRAY');
// });

// await knex('foo').insert({ intarray: [4,3,2,1], stringarray: ['foo','bar'] });

// const rows = await knex('foo');
// console.log(rows);

// // should output: 
// // [ anonymous { id: 1, intarray: [ 4,3,2,1 ], stringarray: [ 'foo', 'bar' ] } ]