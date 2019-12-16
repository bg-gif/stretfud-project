const {
  fetchVendors,
  fetchVendorByUsername,
  sendVendor,
  patchVendor
} = require('../models/vendors-model');

const { filterVendors } = require('../utils/utils');

exports.getVendors = (req, res, next) => {
  let location = req.query.location;

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
    .then(response => {
      res.status(201).send({ vendor: response });
    })
    .catch(next);
};

exports.patchVendor = (req, res, next) => {
  let update = req.body;
  let username = req.params.username;
  patchVendor(update, username)
    .then(response => {
      res.status(200).send({ vendor: response });
    })
    .catch(next);
};
