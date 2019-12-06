const knex = require("../db/connection");

exports.fetchVendors = () => {
  console.log("fetching");
  return knex("vendors")
    .select("*")
    .returning("*")
    .then(vendors => {
      return vendors;
    });
};
