const chai = require("chai");
const { expect } = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const { filterVendors } = require("../utils/utils");

describe("Vendors filter by distance to coordinates", () => {
  it("takes an array of vendors and a coordinate, returns only those vendors within a mile of coordinate", () => {
    let vendors = [
      {
        username: "oppri",
        businessname: "george prime",
        ownername: "optimus prime",
        password: "password",
        phone_num: "01602 616666",
        cuisine: "steak house",
        email: "optimus_prime@autobots.com",
        menu:
          "https://images-na.ssl-images-amazon.com/images/I/81UUigUhffL._SL1500_.jpg",
        opening_times: "9am - 9pm",
        location: "54.796329, -1.642809",
        open_status: false,
        created_at: "2019-12-09T11:30:50.080Z"
      },
      {
        username: "grimlock",
        businessname: "laurence grimlock",
        ownername: "grimlock",
        password: "password",
        phone_num: "02175 346325",
        cuisine: "bbq",
        email: "grimlock@autobots.com",
        menu:
          "https://i.ebayimg.com/00/s/MzM5WDQwMA==/z/OsAAAOSwPc9WtzRH/$_35.JPG?set_id=89040003C1",
        opening_times: "3am - 5am",
        location: "53.794764, -1.542165",
        open_status: false,
        created_at: "2019-12-09T11:30:50.080Z"
      },
      {
        username: "hotrod",
        businessname: "rod caliente",
        ownername: "hotrod",
        password: "password",
        phone_num: "01645 346273",
        cuisine: "south korean hotpot",
        email: "hotrod@autobots.com",
        menu: "https://s3.amazonaws.com/tf.images/reduced-image_13638_106.jpg",
        opening_times: "12pm - 10pm",
        location: "53.795715, -1.545040",
        open_status: false,
        created_at: "2019-12-09T11:30:50.080Z"
      },
      {
        username: "ironhide",
        businessname: "pilar ferrous",
        ownername: "ironhide",
        password: "password",
        phone_num: "01564 568473",
        cuisine: "hogroast",
        email: "ironhide@autobots.com",
        menu: "https://s3.amazonaws.com/tf.images/reduced-image_10937_106.jpg",
        opening_times: "6am - 6pm",
        location: "53.793522, -1.545630",
        open_status: false,
        created_at: "2019-12-09T11:30:50.080Z"
      }
    ];
    let location = "53.794945,-1.54645";
    expect(filterVendors(vendors, location)).to.be.a("array");
    expect(filterVendors(vendors, location)).to.have.length(3);
  });
});
