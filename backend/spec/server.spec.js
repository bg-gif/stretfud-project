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
    describe('/users', () => {
      describe('POST', () => {
        it('status 201, posts a user, returns the posted user', () => {
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
        it('status 400 when no username', () => {
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
        it('status 400 when no password', () => {
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
        it('status 400 when no realname', () => {
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
        it('status 400 when invalid data type', () => {
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
        describe('INVALID METHODS', () => {
          it('status:405, responds with method not allowed', () => {
            const methodArr = ['post', 'patch', 'put', 'delete'];
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
        it('status 200: return and object with key of vendors and an array of vendors', () => {
          return request
            .get('/api/vendors')
            .expect(200)
            .then(response => {
              expect(response.body).to.have.own.property('vendors');
              expect(response.body.vendors[0]).to.have.own.property('username');
            });
        });
      });
      describe('POST', () => {
        it('status:201, returns posted vendor', () => {
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
              businessname: 'Tejanos',
              password: 'password'
            })
            .expect(201)
            .then(({ body: { vendor } }) => {
              expect(vendor).to.include.key('created_at');
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
          const methodArr = ['patch', 'put', 'delete'];
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
          it('status 200: returns an object with key of vendor and expected value', () => {
            return request
              .get('/api/vendors/oppri')
              .expect(200)
              .then(res => {
                expect(res.body.vendor.username).to.equal('oppri');
              });
          });
          it('status: 404 for valid but non existent vendor_id', () => {
            return request
              .get('/api/vendors/steve')
              .expect(404)
              .then(res => {
                expect(res.body.msg).to.equal('Vendor Does Not Exist');
              });
          });
        });
        describe('INVALID METHODS', () => {
          it('status:405, responds with method not allowed', () => {
            const methodArr = ['post', 'patch', 'put', 'delete'];
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
      });
    });
  });
});
