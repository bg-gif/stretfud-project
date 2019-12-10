const loginRouter = require('express')();
const { handle405s } = require('../errors/index');
const {
  checkUserPassword,
  checkVendorPassword
} = require('../controllers/login-controller.js');

loginRouter
  .route('/users')
  .post(checkUserPassword)
  .all(handle405s);

loginRouter
  .route('/vendors')
  .post(checkVendorPassword)
  .all(handle405s);

module.exports = loginRouter;
