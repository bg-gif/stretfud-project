const knex = require('../db/connection');

exports.fetchVendors = () => {
  return knex('vendors')
    .select(
      'username',
      'ownername',
      'cuisine',
      'location',
      'opening_times',
      'open_status',
      'menu',
      'businessname',
      'phone_num',
      'email'
    )
    .then(vendors => {
      return vendors;
    });
};

exports.fetchVendorByUsername = Username => {
  return knex('vendors')
    .select(
      'username',
      'ownername',
      'cuisine',
      'location',
      'opening_times',
      'open_status',
      'menu',
      'businessname',
      'phone_num',
      'email'
    )
    .where({ 'vendors.username': Username })
    .then(vendor => {
      return vendor;
    });
};

exports.sendVendor = user => {
  return knex('vendors')
    .insert(user)
    .returning(
      'username',
      'ownername',
      'cuisine',
      'location',
      'opening_times',
      'open_status',
      'menu',
      'businessname',
      'phone_num',
      'email'
    );
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
    .returning(
      'username',
      'ownername',
      'cuisine',
      'location',
      'opening_times',
      'open_status',
      'menu',
      'businessname',
      'phone_num',
      'email'
    );
};
