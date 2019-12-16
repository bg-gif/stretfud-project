exports.up = function(knex) {
  return knex.schema.createTable("order_items", table => {
    table.increments("order_item_id");
    table
      .integer("order_id")
      .references("order_id")
      .inTable("orders")
      .notNullable();
    table
      .integer("menu_item_id")
      .references("menu_item_id")
      .inTable("menu_items")
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("order_items");
};
