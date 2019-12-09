const {
  fetchVendors,
  fetchVendorByUsername,
  sendVendor,
  patchVendor
} = require('../models/vendors-model');

exports.getVendors = (req, res, next) => {
  fetchVendors()
    .then(vendors => {
      res.status(200).send({ vendors });
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
      res.status(201).send({ vendor });
    })
    .catch(next);
};

exports.patchVendor = (req, res, next) => {
  let update = req.body;
  let username = req.params.username;
  patchVendor(update, username)
    .then(([vendor]) => {
      const { location, open_status, menu } = req.body;
      if (!location && !open_status && !menu) {
        return Promise.reject({ status: 400, msg: 'Bad Request' });
      }
      res.status(200).send({ vendor });
    })
    .catch(next);
};
