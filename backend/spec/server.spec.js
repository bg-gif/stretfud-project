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
      describe('/user_id', () => {
        describe('GET', () => {
          it('status:200, returns an object with key of user and expected value', () => {
            return request
              .get('/api/users/1')
              .expect(200)
              .then(({ body: { user } }) => {
                expect(user).to.be.an('object');
                expect(user).to.contain.keys(
                  'user_id',
                  'username',
                  'realname',
                  'phone_num',
                  'email',
                  'age'
                );
              });
          });
          it('status:400, invalid user id datatype', () => {
            return request
              .get('/api/users/mike')
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Bad Request');
              });
          });
          it('status:404, valid but non existent user id', () => {
            return request
              .get('/api/users/999')
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('User Does Not Exist');
              });
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
      describe('/vendor_id', () => {
        describe('GET', () => {});
      });
    });
  });
});
