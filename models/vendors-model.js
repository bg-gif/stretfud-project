const connection = require('../db/connection');

exports.fetchVendors = () => {
  return connection('vendors')
    .select(
      'username',
      'realname',
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
      'realname',
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
        realname,
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
        realname,
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
        realname,
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
        realname,
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

exports.fetchMenuItems = username => {
  return connection('menu_items')
    .select('*')
    .where({ username });
};

exports.updateMenuItem = (menu_item_id, options) => {
  const {
    available,
    price,
    description,
    allergens,
    vegetarian,
    vegan,
    gluten_free
  } = options;
  if (
    !available &&
    !price &&
    !description &&
    !allergens &&
    !vegetarian &&
    !vegan &&
    !gluten_free
  ) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  return connection('menu_items')
    .where({ menu_item_id })
    .modify(query => {
      if (available) query.update({ available });
      if (price) query.update({ price });
      if (description) query.update({ description });
      if (allergens) query.update({ allergens });
      if (vegetarian) query.update({ vegetarian });
      if (vegan) query.update({ vegan });
      if (gluten_free) query.update({ gluten_free });
    })
    .returning('*');
};

exports.checkMenuItemId = menu_item_id => {
  return connection('menu_items')
    .select('*')
    .where({ menu_item_id })
    .then(menu_item => {
      if (menu_item.length === 0) {
        return Promise.reject({ status: 404, msg: 'menu_item not found' });
      }
    });
};

exports.deleteMenuItemMod = menu_item_id => {
  return connection('menu_items')
    .select('*')
    .where({ menu_item_id })
    .del();
};

exports.sendMenuItem = (menuItem, username) => {
  return connection('menu_items')
    .insert({ username, ...menuItem })
    .returning('*');
};

exports.fetchOrders = (username, status) => {
  if (status !== 'open' && status !== 'closed' && status !== undefined) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  if (status === 'closed') {
    return connection('orders')
      .leftJoin('order_items', 'order_items.order_id', 'orders.order_id')
      .leftJoin(
        'menu_items',
        'order_items.menu_item_id',
        'menu_items.menu_item_id'
      )
      .select(
        'orders.order_id',
        'orders.created_at',
        'orders.status',
        'orders.user_username',
        'menu_items.price',
        'menu_items.name'
      )
      .where('orders.vendor_username', username)
      .where('orders.status', 'collected');
  } else if (status === 'open') {
    return connection('orders')
      .leftJoin('order_items', 'order_items.order_id', 'orders.order_id')
      .leftJoin(
        'menu_items',
        'order_items.menu_item_id',
        'menu_items.menu_item_id'
      )
      .select(
        'orders.order_id',
        'orders.created_at',
        'orders.status',
        'orders.user_username',
        'menu_items.price',
        'menu_items.name'
      )
      .where('orders.vendor_username', username)
      .whereNot('orders.status', 'collected');
  } else
    return connection('orders')
      .leftJoin('order_items', 'order_items.order_id', 'orders.order_id')
      .leftJoin(
        'menu_items',
        'order_items.menu_item_id',
        'menu_items.menu_item_id'
      )
      .select(
        'orders.order_id',
        'orders.created_at',
        'orders.status',
        'orders.user_username',
        'menu_items.price',
        'menu_items.name'
      )
      .where('orders.vendor_username', username);
};
