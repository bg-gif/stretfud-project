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
      describe("POST", () => {
        it("status 201, posts a user, returns the posted user", () => {
          return request
            .post("/api/users")
            .send({
              username: "Gregg11",
              password: "password",
              realname: "Gregg Wallace",
              phone_num: "07825184365",
              age: 55,
              email: "whoateallthepies@gmail.com"
            })
            .expect(201)
            .then(({ body: { user } }) => {
              expect(user).to.be.an("object");
              expect(user.username).to.equal("Gregg11");
            });
        });
        it("status 400, 'Bad Request' when same username posted twice", () => {
          return request
            .post("/api/users")
            .send({
              username: "Gregg11",
              password: "password",
              realname: "Gregg Wallace",
              phone_num: "07825184365",
              age: 55,
              email: "whoateallthepies@gmail.com"
            })
            .expect(201)
            .then(({ body: { user } }) => {
              expect(user).to.be.an("object");
              expect(user.username).to.equal("Gregg11");
            })
            .then(() => {
              return request
                .post("/api/users")
                .send({
                  username: "Gregg11",
                  password: "password",
                  realname: "Gregg Wallace",
                  phone_num: "07825184365",
                  age: 55,
                  email: "whoateallthepies@gmail.com"
                })
                .expect(400)
                .then(res => {
                  expect(res.body.msg).to.equal("Bad Request");
                });
            });
        });
        it("status 400 when no username", () => {
          return request
            .post("/api/users")
            .send({
              password: "password",
              realname: "Gregg Wallace",
              phone_num: "07825184365",
              age: 55,
              email: "whoateallthepies@gmail.com"
            })
            .expect(400);
        });
        it("status 400 when no password", () => {
          return request
            .post("/api/users")
            .send({
              username: "Obble",

              realname: "Gregg Wallace",
              phone_num: "07825184365",
              age: 55,
              email: "whoateallthepies@gmail.com"
            })
            .expect(400);
        });
        it("status 400 when no realname", () => {
          return request
            .post("/api/users")
            .send({
              username: "Jinglebells212",
              password: "password",

              phone_num: "07825184365",
              age: 55,
              email: "whoateallthepies@gmail.com"
            })
            .expect(400);
        });
        it("status 400 when invalid data type", () => {
          return request
            .post("/api/users")
            .send({
              username: "Jinglebells212",
              password: "password",
              realname: "Gregg Wallace",
              phone_num: "07825184365",
              age: "String",
              email: "whoateallthepies@gmail.com"
            })
            .expect(400);
        });
      });
<<<<<<< HEAD
      describe("/username", () => {
        describe("GET", () => {
          it("status:200, returns an object with key of user and expected value", () => {
=======
      describe('INVALID METHODS', () => {
        it('status:405, responds with method not allowed', () => {
          const methodArr = ['get', 'patch', 'put', 'delete'];
          const promiseArr = methodArr.map(method => {
            return request[method]('/api/users')
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Method not allowed');
              });
          });
          return Promise.all[promiseArr];
        });
      });
      describe('/username', () => {
        describe('GET', () => {
          it('status:200, returns an object with key of user and expected value', () => {
>>>>>>> 474c6fec06551278e86fb097bcf252e3eb755d8e
            return request
              .get("/api/users/megatron")
              .expect(200)
              .then(({ body: { user } }) => {
                expect(user).to.be.an("object");
                expect(user).to.contain.keys(
                  "username",
                  "realname",
                  "phone_num",
                  "email",
                  "age"
                );
              });
          });
          // it('status:400, invalid user id datatype', () => {
          //   return request
          //     .get('/api/users/12345')
          //     .expect(400)
          //     .then(({ body: { msg } }) => {
          //       expect(msg).to.equal('Bad Request');
          //     });
          // });
          it("status:404, valid but non existent user id", () => {
            return request
              .get("/api/users/mike")
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("User Does Not Exist");
              });
          });
        });
<<<<<<< HEAD
        describe("INVALID METHODS", () => {
          it("status:405, responds with method not allowed", () => {
            const methodArr = ["get", "patch", "put", "delete"];
            const promiseArr = methodArr.map(method => {
              return request[method]("/api/users")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Method not allowed");
                });
            });
            return Promise.all[promiseArr];
          });
        });
        describe("INVALID METHODS", () => {
          it("status:405, responds with method not allowed", () => {
            const methodArr = ["post", "patch", "put", "delete"];
=======
        describe('PATCH', () => {
          it('status:200, updates user phone number and returns updated user', () => {
            return request
              .patch('/api/users/megatron')
              .send({ phone_num: '01234 567890' })
              .expect(200)
              .then(({ body: { user } }) => {
                expect(user.phone_num).to.equal('01234 567890');
              });
          });
          it('status:200, updates user email and returns updated user', () => {
            return request
              .patch('/api/users/megatron')
              .send({ email: 'testing@gmail.com' })
              .expect(200)
              .then(({ body: { user } }) => {
                expect(user.email).to.equal('testing@gmail.com');
              });
          });
          it('status:400, rejects any other updates', () => {
            return request
              .patch('/api/users/megatron')
              .send({ username: 'anewusername' })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Bad Request');
              });
          });
        });

        describe('INVALID METHODS', () => {
          it('status:405, responds with method not allowed', () => {
            const methodArr = ['post', 'put', 'delete'];
>>>>>>> 474c6fec06551278e86fb097bcf252e3eb755d8e
            const promiseArr = methodArr.map(method => {
              return request[method]("/api/users/1")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Method not allowed");
                });
            });
            return Promise.all[promiseArr];
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
              expect(response.body.vendors[0]).to.have.own.property("username");
            });
        });
        it("takes a query of location with the coordinates and returns only those vendors within a mile", () => {
          return request
            .get("/api/vendors?location=53.794945,-1.54645")
            .expect(200)
            .then(response => {
              console.log(response.body, "<<<<<<<<<res.body of filtered");
              expect(response.body).to.have.own.property("vendors");
              expect(response.body.vendors).to.have.length(3);
            });
        });
      });
      describe("POST", () => {
        it("status:201, returns posted vendor", () => {
          return request
            .post("/api/vendors")
            .send({
              username: "TejanosBoss",
              ownername: "Carl Berens",
              cuisine: "mexican",
              location: "54.338936, -1.434165",
              opening_times: "12-7pm",
              phone_num: "01609 777770",
              menu:
                "https://www.tejanos.co.uk/wp-content/uploads/2018/01/Steak-House-Square.jpg",
              businessname: "Tejanos",
              password: "password"
            })
            .expect(201)
            .then(({ body: { vendor } }) => {
              expect(vendor).to.include.key("created_at");
            });
        });
        it('status:400, bad request on no username', () => {
          return request
            .post('/api/vendors')
            .send({
              ownername: 'Carl Berens',
              cuisine: 'mexican',
              location: '54.338936, -1.434165',
              opening_times: '12-7pm',
              phone_num: '01609 777770',
              menu:
                'https://www.tejanos.co.uk/wp-content/uploads/2018/01/Steak-House-Square.jpg',
              businessname: 'Tejanos',
              password: 'password'
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Bad Request');
            });
        });
        it('status:400, bad request on no cuisine', () => {
          return request
            .post('/api/vendors')
            .send({
              username: 'TejanosBoss',
              ownername: 'Carl Berens',
              location: '54.338936, -1.434165',
              opening_times: '12-7pm',
              phone_num: '01609 777770',
              menu:
                'https://www.tejanos.co.uk/wp-content/uploads/2018/01/Steak-House-Square.jpg',
              businessname: 'Tejanos',
              password: 'password'
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Bad Request');
            });
        });
        it('status:400, bad request on no ownername', () => {
          return request
            .post('/api/vendors')
            .send({
              username: 'TejanosBoss',
              cuisine: 'mexican',
              location: '54.338936, -1.434165',
              opening_times: '12-7pm',
              phone_num: '01609 777770',
              menu:
                'https://www.tejanos.co.uk/wp-content/uploads/2018/01/Steak-House-Square.jpg',
              businessname: 'Tejanos',
              password: 'password'
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Bad Request');
            });
        });
        it('status:400, bad request on no location', () => {
          return request
            .post('/api/vendors')
            .send({
              username: 'TejanosBoss',
              ownername: 'Carl Berens',
              cuisine: 'mexican',
              opening_times: '12-7pm',
              phone_num: '01609 777770',
              menu:
                'https://www.tejanos.co.uk/wp-content/uploads/2018/01/Steak-House-Square.jpg',
              businessname: 'Tejanos',
              password: 'password'
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Bad Request');
            });
        });
        it('status:400, bad request on no opening times', () => {
          return request
            .post('/api/vendors')
            .send({
              username: 'TejanosBoss',
              ownername: 'Carl Berens',
              cuisine: 'mexican',
              location: '54.338936, -1.434165',
              phone_num: '01609 777770',
              menu:
                'https://www.tejanos.co.uk/wp-content/uploads/2018/01/Steak-House-Square.jpg',
              businessname: 'Tejanos',
              password: 'password'
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Bad Request');
            });
        });
        it('status:400, bad request on no password', () => {
          return request
            .post('/api/vendors')
            .send({
              username: 'TejanosBoss',
              ownername: 'Carl Berens',
              cuisine: 'mexican',
              location: '54.338936, -1.434165',
              opening_times: '12-7pm',
              phone_num: '01609 777770',
              menu:
                'https://www.tejanos.co.uk/wp-content/uploads/2018/01/Steak-House-Square.jpg',
              businessname: 'Tejanos'
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Bad Request');
            });
        });
        it('status:400, bad request on posting pre existing username', () => {
          return request
            .post('/api/vendors')
            .send({
              username: 'oppri',
              ownername: 'Carl Berens',
              cuisine: 'mexican',
              location: '54.338936, -1.434165',
              opening_times: '12-7pm',
              phone_num: '01609 777770',
              menu:
                'https://www.tejanos.co.uk/wp-content/uploads/2018/01/Steak-House-Square.jpg',
              businessname: 'Tejanos',
              password: 'password'
            })
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Bad Request');
            });
        });
      });
<<<<<<< HEAD
      describe("INVALID METHODS", () => {
        it("status:405, responds with method not allowed", () => {
          const methodArr = ["patch", "put", "delete"];
=======

      describe('INVALID METHODS', () => {
        it('status:405, responds with method not allowed', () => {
          const methodArr = ['put', 'patch', 'delete'];
>>>>>>> 474c6fec06551278e86fb097bcf252e3eb755d8e
          const promiseArr = methodArr.map(method => {
            return request[method]("/api/vendors")
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal("Method not allowed");
              });
          });
          return Promise.all[promiseArr];
        });
      });
      describe("/username", () => {
        describe("GET", () => {
          it("status 200: returns an object with key of vendor and expected value", () => {
            return request
              .get("/api/vendors/oppri")
              .expect(200)
              .then(res => {
                expect(res.body.vendor.username).to.equal("oppri");
              });
          });
          it("status: 404 for valid but non existent vendor_id", () => {
            return request
              .get("/api/vendors/steve")
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal("Vendor Does Not Exist");
              });
          });
        });
<<<<<<< HEAD
        describe("INVALID METHODS", () => {
          it("status:405, responds with method not allowed", () => {
            const methodArr = ["post", "patch", "put", "delete"];
=======
        describe('PATCH', () => {
          it('status:200, updates location and returns updated vendor ', () => {
            return request
              .patch('/api/vendors/oppri')
              .send({ location: '84.999078, -134.999172' })
              .expect(200)
              .then(({ body: { vendor } }) => {
                expect(vendor.location).to.equal('84.999078, -134.999172');
              });
          });
          it('status:200, updates open status and returns updated vendor ', () => {
            return request
              .patch('/api/vendors/oppri')
              .send({ open_status: true })
              .expect(200)
              .then(({ body: { vendor } }) => {
                expect(vendor.open_status).to.equal(true);
              });
          });
          it('status:200, updates menu and returns updated vendor ', () => {
            return request
              .patch('/api/vendors/oppri')
              .send({
                menu:
                  'https://c402277.ssl.cf1.rackcdn.com/photos/11552/images/hero_small/rsz_namibia_will_burrard_lucas_wwf_us_1.jpg?1462219623'
              })
              .expect(200)
              .then(({ body: { vendor } }) => {
                expect(vendor.menu).to.equal(
                  'https://c402277.ssl.cf1.rackcdn.com/photos/11552/images/hero_small/rsz_namibia_will_burrard_lucas_wwf_us_1.jpg?1462219623'
                );
              });
          });
          it('status:400, bad request on update opening times with non boolean', () => {
            return request
              .patch('/api/vendors/oppri')
              .send({
                open_status: 'bananas'
              })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Bad Request');
              });
          });
          it('status:400, bad request on trying to update any other fields', () => {
            return request
              .patch('/api/vendors/oppri')
              .send({
                username: 'bananas'
              })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Bad Request');
              });
          });
        });
        describe('INVALID METHODS', () => {
          it('status:405, responds with method not allowed', () => {
            const methodArr = ['post', 'put', 'delete'];
>>>>>>> 474c6fec06551278e86fb097bcf252e3eb755d8e
            const promiseArr = methodArr.map(method => {
              return request[method]("/api/vendors/oppri")
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal("Method not allowed");
                });
            });
            return Promise.all[promiseArr];
          });
        });
      });
    });
  });
});
