const apiRouter = require('express')();
const { handle405s } = require('../errors/index');
const usersRouter = require('../routers/users-router');

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
