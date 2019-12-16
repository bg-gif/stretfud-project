const {
  usersData,
  vendorsData,
  menuItemsData,
  ordersData,
  orderItemsData
} = require("../data/index");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(usersData)
        .into("users")
        .returning("*");
    })
    .then(() => {
      return knex
        .insert(vendorsData)
        .into("vendors")
        .returning("*");
    })
    .then(() => {
      return knex
        .insert(menuItemsData)
        .into("menu_items")
        .returning("*");
    })
    .then(() => {
      return knex
        .insert(ordersData)
        .into("orders")
        .returning("*");
    })
    .then(() => {
      return knex
        .insert(orderItemsData)
        .into("order_items")
        .returning("*");
    });
};
