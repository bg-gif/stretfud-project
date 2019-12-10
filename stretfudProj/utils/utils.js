const axios = require("axios");
const base_URL = "https://stretfud.herokuapp.com/api";

exports.fetchVendor = username => {
  return axios.get(`${base_URL}/vendors/${username}`).then(({ data }) => {
    return data.vendor;
  });
};
