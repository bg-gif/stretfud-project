exports.formatLocation = ({ latitude, longitude }) => {
  return `${latitude}, ${longitude}`;
};

exports.fetchVendorsByLocation = (lat, long) => {
  return axios
    .get(`${base_URL}/vendors?=${lat},${long}`)
    .then(({ data: { vendors } }) => {
      return vendors;
    });
};
