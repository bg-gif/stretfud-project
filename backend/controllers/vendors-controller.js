const { fetchVendors, fetchVendorById } = require("../models/vendors-model");

exports.getVendors = (req, res, next) => {
  fetchVendors()
    .then(vendors => {
      res.status(200).send({ vendors });
    })
    .catch(next);
};

exports.getVendorById = (req, res, next) => {
  let vendorId = req.params.vendor_id;
  fetchVendorById(vendorId)
    .then(vendor => {
      if (vendor.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Vendor Does Not Exist`
        });
      }
      res.status(200).send({ vendor: vendor[0] });
    })
    .catch(next);
};
