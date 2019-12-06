const usersRouter = require('express')();
const { handle405s } = require('../errors');
const { getUserById } = require('../controllers/users-controller.js');

usersRouter.route('/:user_id').get(getUserById);

module.exports = usersRouter;
