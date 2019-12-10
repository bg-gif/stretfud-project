const apiRouter = require('express')();
const { handle405s, handle404s } = require('../errors/index');
const vendorsRouter = require('./vendors-router');
const usersRouter = require('../routers/users-router');
const uploadRouter = require('../routers/upload-router');
const loginRouter = require('./login-router');
const ends = require('../endpoints.json');

const endPoints = (req, res, next) => {
  res.status(200).send(ends);
};

apiRouter.use('/vendors', vendorsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/upload', uploadRouter);
apiRouter.use('/login', loginRouter);
apiRouter
  .route('/')
  .get(endPoints)
  .all(handle405s);
apiRouter.route('/*').all(handle404s);

module.exports = apiRouter;
