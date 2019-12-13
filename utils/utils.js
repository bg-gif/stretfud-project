const geolib = require('geolib');

exports.filterVendors = (vendors, location) => {
  return vendors.filter(vendor => {
    if (!vendor.location) return null;
    let locationObj = {
      latitude: location.split(',')[0],
      longitude: location.split(',')[1]
    };
    let lat = +vendor.location.split(',')[0];
    let long = +vendor.location.split(',')[1];

    let vendorLocation = { latitude: lat, longitude: long };
    let distance = geolib.getDistance(locationObj, vendorLocation, 1);

    return distance < 1609;
  });
};
