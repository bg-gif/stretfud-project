const geolib = require('geolib');

exports.filterVendors = (vendors, location) => {
  return vendors.filter(vendor => {
    if (!vendor.location) return null;
    let locationObj = {
      latitude: location.split(',')[0],
      longitude: location.split(',')[1]
    };
    let latitude = +vendor.location.split(',')[0];
    let longitude = +vendor.location.split(',')[1];

    let vendorLocation = { latitude, longitude };
    let distance = geolib.getDistance(locationObj, vendorLocation, 1);
    console.log(distance < 1609);
    return distance < 1609;
  });
};
