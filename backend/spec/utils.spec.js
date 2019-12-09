const chai = require("chai");
const { expect } = require("chai");
const chaiSorted = require("chai-sorted");
chai.use(chaiSorted);
const { filterVendors } = require("../utils/utils");

describe("Vendors filter by distance to coordinates", () => {
  it("takes an array of vendors and a coordinate, returns only those vendors within a mile of coordinate", () => {
    let location = { latitude: 53.829016, longitude: -1.576302 };
    expect(filterVendors(location)).to.be.a("number");
  });
});
