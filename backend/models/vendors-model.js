const knex = require('../db/connection');

exports.fetchVendors = () => {
  return knex('vendors')
    .select('*')
    .returning('*')
    .then(vendors => {
      return vendors;
    });
};

exports.fetchVendorByUsername = Username => {
  return knex('vendors')
    .select('*')
    .where({ 'vendors.username': Username })
    .then(vendor => {
      return vendor;
    });
};

exports.sendVendor = user => {
  return knex('vendors')
    .insert(user)
    .returning('*');
};

exports.patchVendor = (update, username) => {
  const { location, open_status, menu } = update;
  return knex('vendors')
    .where({ username })
    .modify(query => {
      if (location) query.update({ location });
      if (open_status) query.update({ open_status });
      if (menu) query.update({ menu });
    })
    .returning('*');
};
