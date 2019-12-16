process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = require('chai');
const chaiSorted = require('chai-sorted');
const app = require('../server');
const request = require('supertest')(app);

const connection = require('../db/connection');

chai.use(chaiSorted);

beforeEach(() => {
  return connection.seed.run();
});

after(() => {
  return connection.destroy(() => {
    console.log('Connection Ended');
  });
});

describe('server', () => {
  describe('/api', () => {
    describe('GET', () => {
      it('status:200, returns a JSON object with all available endpoints', () => {
        return request
          .get('/api/')
          .expect(200)
          .then(({ body }) => {
            expect(body).to.be.an('object');
          });
      });
      it('status:404, returns error on all other requests', () => {
        return request
          .get('/api/bananas')
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('Path not found');
          });
      });
    });
    describe('INVALID METHODS', () => {
      it('status:405, responds with method not allowed', () => {
        const methodArr = ['post', 'patch', 'put', 'delete'];
        const promiseArr = methodArr.map(method => {
          return request[method]('/api/')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Method not allowed');
            });
        });
        return Promise.all[promiseArr];
      });
    });
    describe('/orders', () => {
      describe('POST', () => {
        it('status:201, inserts order into respective menus', () => {
          return request
            .post('/api/orders')
            .send({
              user: 'megatron',
              vendor: 'oppri',
              order: [{ menu_item_id: 1 }, { menu_item_id: 2 }]
            })
            .expect(201)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Inserted');
            });
        });
        it('status:422, Invalid username value', () => {
          {
            return request
              .post('/api/orders')
              .send({
                user: 'megaton',
                vendor: 'oppri',
                order: [{ menu_item_id: 1 }, { menu_item_id: 2 }]
              })
              .expect(422)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Unprocessable Entity');
              });
          }
        });
        it('status:422, Invalid username value', () => {
          {
            return request
              .post('/api/orders')
              .send({
                user: 'megatron',
                vendor: 'oppra',
                order: [{ menu_item_id: 1 }, { menu_item_id: 2 }]
              })
              .expect(422)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Unprocessable Entity');
              });
          }
        });
        it('status:400, Missing User Key', () => {
          {
            return request
              .post('/api/orders')
              .send({
                vendor: 'oppra',
                order: [{ menu_item_id: 1 }, { menu_item_id: 2 }]
              })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Bad Request');
              });
          }
        });
        it('status:400, Missing Vendor Key', () => {
          {
            return request
              .post('/api/orders')
              .send({
                user: 'megatron',
                order: [{ menu_item_id: 1 }, { menu_item_id: 2 }]
              })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Bad Request');
              });
          }
        });
        it('status:422, Invalid menu item id', () => {
          {
            return request
              .post('/api/orders')
              .send({
                user: 'megatron',
                vendor: 'oppri',
                order: [{ menu_item_id: 99 }, { menu_item_id: 2 }]
              })
              .expect(422)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Unprocessable Entity');
              });
          }
        });
        it('status:4, Invalid menu item id key', () => {
          {
            return request
              .post('/api/orders')
              .send({
                user: 'megatron',
                vendor: 'oppri',
                order: [{ menu_item_id: 1 }, { menu_i_id: 2 }]
              })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Bad Request');
              });
          }
        });
      });
    });
    describe('/users', () => {
      describe('POST', () => {
        it('status 201, posts a user, returns the posted user', () => {
          return request
            .post('/api/users')
            .send({
              username: 'Gregg11',
              password: 'password',
              realname: 'Gregg Wallace'
            })
            .expect(201)
            .then(({ body: { user } }) => {
              expect(user).to.be.an('object');
              expect(user.username).to.equal('Gregg11');
            });
        });
        it("status 400, 'Bad Request' when same username posted twice", () => {
          return request
            .post('/api/users')
            .send({
              username: 'Gregg11',
              password: 'password',
              realname: 'Gregg Wallace',
              phone_num: '07825184365',
              age: 55,
              email: 'whoateallthepies@gmail.com'
            })
            .expect(201)
            .then(({ body: { user } }) => {
              expect(user).to.be.an('object');
              expect(user.username).to.equal('Gregg11');
            })
            .then(() => {
              return request
                .post('/api/users')
                .send({
                  username: 'Gregg11',
                  password: 'password',
                  realname: 'Gregg Wallace',
                  phone_num: '07825184365',
                  age: 55,
                  email: 'whoateallthepies@gmail.com'
                })
                .expect(400)
                .then(res => {
                  expect(res.body.msg).to.equal('Bad Request');
                });
            });
        });
        it('status 400, when no username', () => {
          return request
            .post('/api/users')
            .send({
              password: 'password',
              realname: 'Gregg Wallace',
              phone_num: '07825184365',
              age: 55,
              email: 'whoateallthepies@gmail.com'
            })
            .expect(400);
        });
        it('status 400, when no password', () => {
          return request
            .post('/api/users')
            .send({
              username: 'Obble',

              realname: 'Gregg Wallace',
              phone_num: '07825184365',
              age: 55,
              email: 'whoateallthepies@gmail.com'
            })
            .expect(400);
        });
        it('status 400, when no realname', () => {
          return request
            .post('/api/users')
            .send({
              username: 'Jinglebells212',
              password: 'password',

              phone_num: '07825184365',
              age: 55,
              email: 'whoateallthepies@gmail.com'
            })
            .expect(400);
        });
        it('status 400, when invalid data type', () => {
          return request
            .post('/api/users')
            .send({
              username: 'Jinglebells212',
              password: 'password',
              realname: 'Gregg Wallace',
              phone_num: '07825184365',
              age: 'String',
              email: 'whoateallthepies@gmail.com'
            })
            .expect(400);
        });
      });
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
            return request
              .get('/api/users/megatron')
              .expect(200)
              .then(({ body: { user } }) => {
                expect(user).to.be.an('object');
                expect(user).to.contain.keys(
                  'username',
                  'realname',
                  'phone_num',
                  'email',
                  'age'
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
          it('status:404, valid but non existent user id', () => {
            return request
              .get('/api/users/mike')
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('User Does Not Exist');
              });
          });
        });
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
            const promiseArr = methodArr.map(method => {
              return request[method]('/api/users/1')
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('Method not allowed');
                });
            });
            return Promise.all[promiseArr];
          });
        });
      });
    });
    describe('/vendors', () => {
      describe('GET', () => {
        it('status:200, return and object with key of vendors and an array of vendors', () => {
          return request
            .get('/api/vendors')
            .expect(200)
            .then(response => {
              expect(response.body).to.have.own.property('vendors');
              expect(response.body.vendors[0]).to.have.own.property('username');
            });
        });
        it('status:200, takes a query of location with the coordinates and returns only those vendors within a mile', () => {
          return request
            .get('/api/vendors?location=53.794945,-1.54645')
            .expect(200)
            .then(response => {
              expect(response.body).to.have.own.property('vendors');
              expect(response.body.vendors).to.have.length(3);
            });
        });
      });
      describe('POST', () => {
        it('status:201, returns posted vendor', () => {
          return request
            .post('/api/vendors')
            .send({
              username: 'TejanosBoss',
              realname: 'Carl Berens',
              cuisine: 'mexican',
              location: '54.338936, -1.434165',
              opening_times: '12-7pm',
              phone_num: '01609 777770',
              menu:
                'https://www.tejanos.co.uk/wp-content/uploads/2018/01/Steak-House-Square.jpg',
              businessname: 'Tejanos',
              password: 'password'
            })
            .expect(201)
            .then(({ body: { vendor } }) => {
              expect(vendor.businessname).to.equal('Tejanos');
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
      describe('INVALID METHODS', () => {
        it('status:405, responds with method not allowed', () => {
          const methodArr = ['put', 'patch', 'delete'];
          const promiseArr = methodArr.map(method => {
            return request[method]('/api/vendors')
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
          it('status:200, returns an object with key of vendor and expected value', () => {
            return request
              .get('/api/vendors/oppri')
              .expect(200)
              .then(res => {
                expect(res.body.vendor.username).to.equal('oppri');
              });
          });
          it('status:404, for valid but non existent vendor_id', () => {
            return request
              .get('/api/vendors/steve')
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal('Vendor Does Not Exist');
              });
          });
        });
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
            const promiseArr = methodArr.map(method => {
              return request[method]('/api/vendors/oppri')
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('Method not allowed');
                });
            });
            return Promise.all[promiseArr];
          });
        });
        describe('/orders', () => {
          describe.only('GET', () => {
            it('status:200, returns array of all order items', () => {
              return request
                .get('/api/vendors/oppri/orders')
                .expect(200)
                .then(({ body: { orders } }) => {
                  expect(orders).to.be.a('array');
                });
            });
          });
        });
        describe('/menu', () => {
          describe('GET', () => {
            it('status:200, returns menu items by username in an array with key of menu_items', () => {
              return request
                .get('/api/vendors/oppri/menu')
                .expect(200)
                .then(({ body: { menu_items } }) => {
                  expect(menu_items).to.be.an('array');
                  expect(menu_items[0]).to.contain.keys(
                    'price',
                    'description',
                    'name'
                  );
                });
            });
            it('status:404, invalid username', () => {
              it('status:404, for valid but non existent vendor_id', () => {
                return request
                  .get('/api/vendors/steve/menu')
                  .expect(404)
                  .then(res => {
                    expect(res.body.msg).to.equal('Vendor Does Not Exist');
                  });
              });
            });
          });
          describe('POST', () => {
            it('status:201, adds menu item to db and returns added menu item ', () => {
              return request
                .post('/api/vendors/oppri/menu')
                .send({
                  name: 'pizza',
                  price: 23.65,
                  description: "it's pizza. what do you expect?"
                })
                .expect(201)
                .then(({ body: { menu_item } }) => {
                  expect(menu_item.name).to.equal('pizza');
                  expect(menu_item).to.contain.keys('menu_item_id');
                });
            });
            it('status:400, returns bad request on no name input', () => {
              return request
                .post('/api/vendors/oppri/menu')
                .send({
                  price: 23.65,
                  description: "it's pizza. what do you expect?"
                })
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('Bad Request');
                });
            });
            it('status:400, returns bad request on no price input', () => {
              return request
                .post('/api/vendors/oppri/menu')
                .send({
                  name: 'pizza',
                  description: "it's pizza. what do you expect?"
                })
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('Bad Request');
                });
            });
            it('status:400, returns bad request on bad input data type', () => {
              return request
                .post('/api/vendors/oppri/menu')
                .send({
                  name: 'pizza',
                  price: 'elephant'
                })
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('Bad Request');
                });
            });
            it('status:400, returns bad request on bad input key type', () => {
              return request
                .post('/api/vendors/oppri/menu')
                .send({
                  nome: 'pizza',
                  price: 'elephant'
                })
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('Bad Request');
                });
            });
          });
          describe('INVALID METHODS', () => {
            it('status:405, responds with method not allowed', () => {
              const methodArr = ['put', 'delete'];
              const promiseArr = methodArr.map(method => {
                return request[method]('/api/vendors/oppri/menu')
                  .expect(405)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Method not allowed');
                  });
              });
              return Promise.all[promiseArr];
            });
          });
          describe('/:menu_item_id', () => {
            describe('DELETE', () => {
              it('status:204, deletes a menu item', () => {
                return request
                  .delete('/api/vendors/oopri/menu/1')
                  .expect(204)
                  .then(() => {
                    return request
                      .delete('/api/vendors/oopri/menu/1')
                      .expect(404);
                  });
              });
              it('status:404, for non-existent menu_item_id', () => {
                return request.delete('/api/vendors/oopri/menu/99').expect(404);
              });
              it('status:400, for wrong data type in menu_item_id', () => {
                return request
                  .delete('/api/vendors/oopri/menu/banana')
                  .expect(400);
              });
            });
            describe('PATCH', () => {
              it('status:200, updates menu availability and returns updated item', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ available: true })
                  .expect(200)
                  .then(({ body: { menu_item } }) => {
                    expect(menu_item.available).to.equal(true);
                  });
              });
              it('status:404, returns Not Found if menu item does not exist', () => {
                return request
                  .patch('/api/vendors/oppri/menu/199')
                  .send({ available: true })
                  .expect(404)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Not Found');
                  });
              });
              it('status:400, invalid menu item value', () => {
                return request
                  .patch('/api/vendors/oppri/menu/bananas')
                  .send({ available: true })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:400, returns bad request on bad body object', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ avaiable: true })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:400, returns bad request on bad body value', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ available: 'banans' })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:200, updates menu availability and returns updated item', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ price: 200 })
                  .expect(200)
                  .then(({ body: { menu_item } }) => {
                    expect(menu_item.available).to.equal(true);
                  });
              });
              it('status:400, returns bad request on bad body object', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ prie: 200 })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:400, returns bad request on bad body value', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ price: 'banans' })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:200, updates menu description and returns updated item', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ description: 'bananas' })
                  .expect(200)
                  .then(({ body: { menu_item } }) => {
                    expect(menu_item.description).to.equal('bananas');
                  });
              });
              it('status:400, returns bad request on bad body object', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ descrition: 'bananas' })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:200, updates menu allergens and returns updated item', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ allergens: 'nuts' })
                  .expect(200)
                  .then(({ body: { menu_item } }) => {
                    expect(menu_item.allergens).to.equal('nuts');
                  });
              });
              it('status:400, returns bad request on bad body object', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ allegens: 'nuts' })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:200, updates menu vegetarian status and returns updated item', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ vegetarian: true })
                  .expect(200)
                  .then(({ body: { menu_item } }) => {
                    expect(menu_item.vegetarian).to.equal(true);
                  });
              });
              it('status:400, returns bad request on bad body object', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ vegetrian: true })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:400, returns bad request on bad body value', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ available: 7 })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:200, updates menu vegan status and returns updated item', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ vegan: true })
                  .expect(200)
                  .then(({ body: { menu_item } }) => {
                    expect(menu_item.vegan).to.equal(true);
                  });
              });
              it('status:400, returns bad request on bad body object', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ vegn: true })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:400, returns bad request on bad body value', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ vegan: 7 })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:200, updates menu vegan status and returns updated item', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ gluten_free: true })
                  .expect(200)
                  .then(({ body: { menu_item } }) => {
                    expect(menu_item.gluten_free).to.equal(true);
                  });
              });
              it('status:400, returns bad request on bad body object', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ glten_free: true })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
              it('status:400, returns bad request on bad body value', () => {
                return request
                  .patch('/api/vendors/oppri/menu/1')
                  .send({ gluten_free: 7 })
                  .expect(400)
                  .then(({ body: { msg } }) => {
                    expect(msg).to.equal('Bad Request');
                  });
              });
            });
            describe('INVALID METHODS', () => {
              it('status:405, responds with method not allowed', () => {
                const methodArr = ['post', 'put'];
                const promiseArr = methodArr.map(method => {
                  return request[method]('/api/vendors/oppri/menu/1')
                    .expect(405)
                    .then(({ body: { msg } }) => {
                      expect(msg).to.equal('Method not allowed');
                    });
                });
                return Promise.all[promiseArr];
              });
            });
          });
        });
      });
    });
    describe('/login', () => {
      describe('/users', () => {
        describe('POST', () => {
          it('status:200, returns msg of verified', () => {
            return request
              .post('/api/login/users')
              .send({ username: 'megatron', password: 'password' })
              .expect(200)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Verified');
              });
          });
          it('status:400, responds with bad request to incorrect password', () => {
            return request
              .post('/api/login/users')
              .send({ username: 'megatron', password: 'bassword' })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Bad Request');
              });
          });
          it('status:404, responds with not found to incorrect username', () => {
            return request
              .post('/api/login/users')
              .send({ username: 'Begatron', password: 'password' })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Not Found');
              });
          });
        });
      });
      describe('/vendors', () => {
        describe('POST', () => {
          it('status:200, returns msg of verified', () => {
            return request
              .post('/api/login/vendors')
              .send({ username: 'oppri', password: 'password' })
              .expect(200)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Verified');
              });
          });
          it('status:400, responds with bad request to incorrect password', () => {
            return request
              .post('/api/login/vendors')
              .send({ username: 'oppri', password: 'bassword' })
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Bad Request');
              });
          });
          it('status:404, responds with not found to incorrect username', () => {
            return request
              .post('/api/login/vendors')
              .send({ username: 'Begatron', password: 'password' })
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Not Found');
              });
          });
        });
      });
    });
  });
});
