const connection = require('../db/connection');

exports.sendOrder = (user_username, vendor_username, order) => {
  return connection('orders')
    .insert({ user_username, vendor_username })
    .returning('order_id')
    .then(order_id => {
      const response = order.map(orderItem => {
        const { menu_item_id } = orderItem;
        return connection('order_items').insert({
          order_id: +order_id,
          menu_item_id
        });
      });
      return Promise.all(response).then(() => {});
    });
};
