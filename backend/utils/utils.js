const geolib = require("geolib");

exports.filterVendors = (vendors, location) => {
  return vendors.filter(vendor => {
    let locationObj = {
      latitude: location.split(",")[0],
      longitude: location.split(",")[1]
    };
    let lat = +vendor.location.split(",")[0];
    let long = +vendor.location.split(",")[1];
    console.log(typeof lat, long, "lat long in util");
    let vendorLocation = { latitude: lat, longitude: long };
    let distance = geolib.getDistance(locationObj, vendorLocation, 1);
    console.log(distance, "<<<distance in util");
    return distance < 1609;
  });
};
