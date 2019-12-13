exports.up = function(knex) {
  return knex.schema.createTable('vendors', table => {
    table.string('username').notNullable();
    table.unique('username');
    table.string('businessname').notNullable();
    table.string('ownername').notNullable();
    table.string('password').notNullable();
    table.string('phone_num');
    table.string('cuisine').notNullable();
    table.string('email');
    table.string('menu');
    table.string('opening_times').notNullable();
    table.string('location');
    table.boolean('open_status');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vendors');
};
