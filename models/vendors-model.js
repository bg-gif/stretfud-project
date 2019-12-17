const connection = require('../db/connection');

exports.fetchVendors = () => {
  return connection('vendors')
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
  return connection('vendors')
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
  return connection('vendors')
    .insert(user)
    .returning('*')
    .then(([vendor]) => {
      const {
        username,
        ownername,
        cuisine,
        location,
        opening_times,
        open_status,
        menu,
        businessname,
        phone_num,
        email,
        created_at
      } = vendor;
      return {
        username,
        ownername,
        cuisine,
        location,
        open_status,
        opening_times,
        menu,
        businessname,
        phone_num,
        email,
        created_at
      };
    });
};

exports.patchVendor = (update, username) => {
  const { location, open_status, menu } = update;
  if (!location && !open_status && !menu) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  return connection('vendors')
    .where({ username })
    .modify(query => {
      if (location) query.update({ location });
      if (open_status) query.update({ open_status });
      if (menu) query.update({ menu });
    })
    .returning('*')
    .then(([response]) => {
      const {
        username,
        ownername,
        cuisine,
        location,
        opening_times,
        open_status,
        menu,
        businessname,
        phone_num,
        email
      } = response;
      return {
        username,
        ownername,
        cuisine,
        location,
        opening_times,
        open_status,
        menu,
        businessname,
        phone_num,
        email
      };
    });
};

exports.fetchVendorInfo = username => {
  return connection('vendors')
    .select('username', 'password')
    .where({ username });
};
