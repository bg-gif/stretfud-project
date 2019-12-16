exports.up = function(knex) {
  return knex.schema.createTable("orders", table => {
    table.increments("order_id");
    table
      .string("user_username")
      .references("username")
      .inTable("users")
      .notNullable();
    table
      .string("vendor_username")
      .references("username")
      .inTable("vendors")
      .notNullable();
    table.string("status");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("orders");
};
