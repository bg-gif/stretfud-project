process.env.NODE_ENV = "test";
const chai = require("chai");
const { expect } = require("chai");
const chaiSorted = require("chai-sorted");
const app = require("../server");
const request = require("supertest")(app);

const connection = require("../db/connection");

chai.use(chaiSorted);

beforeEach(() => {
  return connection.seed.run();
});

after(() => {
  return connection.destroy(() => {
    console.log("Connection Ended");
  });
});

describe("server", () => {
  describe("/api", () => {
    describe("/users", () => {
      describe("/user_id", () => {
        describe("GET", () => {
          it("status:200, returns an object with key of user and expected value", () => {
            return request
              .get("/api/users/1")
              .expect(200)
              .then(({ body }) => {
                expect(body).to.be.an("object");
                expect(body).to.contain.keys(
                  "user_id",
                  "username",
                  "realname",
                  "phone_num",
                  "email",
                  "age"
                );
              });
          });
          it("status:404, invalid user id", () => {
            return request
              .get("/api/users/mike")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Not Found");
              });
          });
        });
      });
    });
    describe("/vendors", () => {
      describe("GET", () => {
        it("status 200: return and object with key of vendors and an array of vendors", () => {
          return request
            .get("/api/vendors")
            .expect(200)
            .then(response => {
              expect(response.body).to.have.own.property("vendors");
              expect(response.body.vendors[0]).to.have.own.property(
                "vendor_id"
              );
            });
        });
      });
      describe("/vendor_id", () => {
        describe("GET", () => {
          it("status 200: returns an object with key of vendor and expected value", () => {
            return request
              .get("/api/vendors/1")
              .expect(200)
              .then(res => {
                expect(res.body.vendor.vendor_id).to.equal(1);
              });
          });
          it("status: 404 for valid but non existent vendor_id", () => {
            return request
              .get("/api/vendors/99")
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal("Vendor Does Not Exist");
              });
          });
          it("status: 400 for invalid vendor_id datatype", () => {
            return request
              .get("/api/vendors/obviouslynotavendor")
              .expect(400)
              .then(res => {
                expect(res.body.msg).to.equal("Bad Request");
              });
          });
        });
      });
    });
  });
});
