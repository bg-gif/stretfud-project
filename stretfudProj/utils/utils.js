const axios = require('axios');
const base_URL = 'https://stretfud.herokuapp.com/api';

exports.fetchVendor = username => {
  return axios.get(`${base_URL}/vendors/${username}`).then(({ data }) => {
    return data.vendor;
  });
};

exports.updateVendorInfo = ({ username, location, open_status, menu }) => {
  console.log(username, open_status);
  return axios
    .patch(`${base_URL}/vendors/${username}`, {
      open_status: open_status.toString()
    })
    .then(({ data }) => {
      console.log(data.vendor);
      return data.vendor;
    })
    .catch(err => {
      console.log(err, '<<< error');
    });
};
