const vendorsRouter = require("express")();
const { handle405s } = require("../errors/index");
const {
  getVendors,
  getVendorById
} = require("../controllers/vendors-controller");

vendorsRouter
  .route("/")
  .get(getVendors)
  .all(handle405s);

// vendorsRouter
//   .route("/:vendor_id")
//   .get(getVendorById)
//   .all(handle405s);

module.exports = vendorsRouter;
