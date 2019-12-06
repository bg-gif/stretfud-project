exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments('user_id');
    table.string('username').notNullable();
    table.string('realname').notNullable();
    table.string('phone_num');
    table.string('email');
    table.integer('age');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
