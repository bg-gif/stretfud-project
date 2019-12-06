const { fetchVendors } = require("../models/vendors-model");

exports.getVendors = (req, res, next) => {
  console.log("in controller");
  fetchVendors()
    .then(vendors => {
      res.status(200).send({ vendors });
    })
    .catch(next);
};
