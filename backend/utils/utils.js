const geolib = require("geolib");

location = { latitude: 53.829016, longitude: -1.576302 };

exports.filterVendors = location => {
  const distance = geolib.getDistance(
    location,
    {
      latitude: 53.819016,
      longitude: -1.575302
    },
    1
  );
  return distance;
};
