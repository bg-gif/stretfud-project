const knex = require("../db/connection");

exports.fetchVendors = () => {
  return knex("vendors")
    .select("*")
    .returning("*")
    .then(vendors => {
      return vendors;
    });
};

exports.fetchVendorById = vendorId => {
  return knex("vendors")
    .select("*")
    .where({ "vendors.vendor_id": vendorId })
    .then(vendor => {
      return vendor;
    });
};
