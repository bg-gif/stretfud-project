const { sendOrder, updateOrder } = require('../models/orders-model');

exports.postOrder = (req, res, next) => {
  const { user, vendor, order } = req.body;
  sendOrder(user, vendor, order)
    .then(response => {
      res.status(201).send({ msg: 'Inserted' });
    })
    .catch(next);
};

exports.patchOrder = (req, res, next) => {
  const { status, order_id } = req.body;
  updateOrder(status, order_id)
    .then(([order]) => {
      return !order
        ? Promise.reject({ status: 404, msg: 'Not Found' })
        : res.status(200).send({ order });
    })
    .catch(next);
};
