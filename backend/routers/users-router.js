const usersRouter = require('express')();
const { handle405s } = require('../errors/index');
const { getUserById } = require('../controllers/users-controller.js');

usersRouter
  .route('/:user_id')
  .get(getUserById)
  .all(handle405s);

module.exports = usersRouter;
