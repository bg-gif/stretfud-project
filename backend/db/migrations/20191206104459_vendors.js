exports.up = function(knex) {
  return knex.schema.createTable('vendors', table => {
    table.increments('vendor_id');
    table.string('vendorname').notNullable();
    table.string('ownername').notNullable();
    table.string('password').notNullable();
    table.string('phone_num');
    table.string('cuisine').notNullable();
    table.string('email');
    table.string('menu');
    table.string('opening_times').notNullable();
    table.string('location').notNullable();
    table.boolean('open_status');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vendors');
};
