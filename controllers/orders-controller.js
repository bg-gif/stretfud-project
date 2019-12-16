const { sendOrder } = require('../models/orders-model');

exports.postOrder = (req, res, next) => {
  const { user, vendor, order } = req.body;
  sendOrder(user, vendor, order)
    .then(response => {
      res.status(201).send({ msg: 'Inserted' });
    })
    .catch(next);
};
