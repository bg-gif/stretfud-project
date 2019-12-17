const ordersRouter = require('express')();
const { handle405s } = require('../errors/index');
const { postOrder, patchOrder } = require('../controllers/orders-controller');

ordersRouter
  .route('/')
  .post(postOrder)
  .patch(patchOrder)
  .all(handle405s);

module.exports = ordersRouter;
