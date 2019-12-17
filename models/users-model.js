const connection = require('../db/connection');

exports.fetchUserById = username => {
  return connection('users')
    .select('username', 'realname', 'phone_num', 'email', 'age')
    .where({ username })
    .then(response => {
      return response.length === 0
        ? Promise.reject({ status: 404, msg: 'User Does Not Exist' })
        : response;
    });
};

exports.postUserMod = user => {
  return connection('users')
    .insert(user)
    .returning('*')
    .then(([user]) => {
      const { username, realname, phone_num, email, age, created_at } = user;
      return { username, realname, phone_num, email, age, created_at };
    });
};

exports.fetchUserInfo = username => {
  return connection('users')
    .select('username', 'password')
    .where({ username });
};

exports.updateUserByUsername = (username, update) => {
  const { phone_num, email } = update;
  if (!email && !phone_num) {
    return Promise.reject({ status: 400, msg: 'Bad Request' });
  }
  return connection('users')
    .where({ username })
    .modify(query => {
      if (phone_num) query.update({ phone_num });
      if (email) query.update({ email });
    })
    .returning('*')
    .then(([user]) => {
      const { username, realname, phone_num, email, age } = user;
      return { username, realname, phone_num, email, age };
    });
};

exports.getOrders = (req, res, next) => {
  const { username } = req.params;
  Promise.all([fetchOrders(username), fetchUserById(username)])
    .then(([orders, user]) => {
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: 'Not Found' });
      res.status(200).send({ orders });
    })
    .catch(next);
};

exports.fetchOrders = username => {
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
    .where('orders.user_username', username);
};
