const {
  fetchVendors,
  fetchVendorByUsername,
  sendVendor
} = require("../models/vendors-model");
const { filterVendors } = require("../utils/utils");

exports.getVendors = (req, res, next) => {
  let location = req.query.location;
  console.log(location, "<<<<<<<<<location in vendors controller");
  fetchVendors()
    .then(vendors => {
      if (!location) {
        res.status(200).send({ vendors });
      } else {
        const filteredVendors = filterVendors(vendors, location);
        res.status(200).send({ vendors: filteredVendors });
      }
    })
    .catch(next);
};

exports.getVendorByUsername = (req, res, next) => {
  let username = req.params.username;
  fetchVendorByUsername(username)
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

exports.postVendor = (req, res, next) => {
  let vendor = req.body;
  sendVendor(vendor)
    .then(([vendor]) => {
      console.log(vendor);
      res.status(201).send({ vendor });
    })
    .catch(next);
};
