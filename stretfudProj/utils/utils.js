const axios = require("axios");
const base_URL = "https://stretfud.herokuapp.com/api";

exports.fetchVendor = username => {
  return axios.get(`${base_URL}/vendors/${username}`).then(({ data }) => {
    return data.vendor;
  });
};

exports.updateVendorInfo = ({ username, location, open_status, menu }) => {
  return axios
    .patch(`${base_URL}/vendors/${username}`, { open_status })
    .then(({ data }) => {
      console.log(data.vendor);
      return data.vendor;
    })
    .catch(err => {
      console.log(err, "<<< error");
    });
};

exports.fetchVendorsByLocation = (lat, long) => {
  return axios
    .get(`${base_URL}/vendors?=${lat},${long}`)
    .then(({ data: { vendors } }) => {
      return vendors;
    });
};
