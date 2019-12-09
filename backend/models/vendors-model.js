const knex = require("../db/connection");

exports.fetchVendors = () => {
  return knex("vendors")
    .select("*")
    .returning("*")
    .then(vendors => {
      return vendors;
    });
};

exports.fetchVendorByUsername = Username => {
  return knex("vendors")
    .select("*")
    .where({ "vendors.username": Username })
    .then(vendor => {
      return vendor;
    });
};

exports.sendVendor = user => {
  return knex("vendors")
    .insert(user)
    .returning("*");
};
