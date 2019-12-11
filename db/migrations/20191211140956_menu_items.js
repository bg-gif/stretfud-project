exports.up = function(knex) {
  return knex.schema.createTable('menu_items', table => {
    table.increments('menu_item_id');
    table
      .string('username')
      .references('username')
      .inTable('vendors')
      .onDelete('CASCADE')
      .notNullable();
    table.string('name').notNullable();
    table.decimal('price', 8, 2).notNullable();
    table.string('description');
    table.string('allergens');
    table.boolean('vegetarian').defaultTo(false);
    table.boolean('vegan').defaultTo(false);
    table.boolean('gluten_free').defaultTo(false);
    table.boolean('available').defaultTo(true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('menu_items');
};
