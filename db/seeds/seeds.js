const { usersData, vendorsData } = require('../data/index');

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex
        .insert(usersData)
        .into('users')
        .returning('*');
    })
    .then(() => {
      return knex
        .insert(vendorsData)
        .into('vendors')
        .returning('*');
    });
};
