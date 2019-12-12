const uploadRouter = require('express')();
const { handle405s } = require('../errors/index');
const { sendPhoto } = require('../controllers/upload-controller.js');

uploadRouter
  .route('/')
  .post(sendPhoto)
  .patch(sendPhoto)
  .all(handle405s);

module.exports = uploadRouter;
