const vendorsRouter = require('express')();
const { handle405s } = require('../errors/index');
const {
  getVendors,
  getVendorByUsername,
  postVendor,
  patchVendor
} = require('../controllers/vendors-controller');

vendorsRouter
  .route('/')
  .get(getVendors)
  .post(postVendor)
  .all(handle405s);

vendorsRouter
  .route('/:username')
  .get(getVendorByUsername)
  .patch(patchVendor)
  .all(handle405s);

module.exports = vendorsRouter;
