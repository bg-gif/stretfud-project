const ordersRouter = require('express')();
const { handle405s } = require('../errors/index');
const { postOrder } = require('../controllers/orders-controller');

ordersRouter.route('/').post(postOrder);

module.exports = ordersRouter;
