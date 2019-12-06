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
              .then(({ body }) => {
                expect(body).to.be.an('object');
                expect(body).to.contain.keys(
                  'user_id',
                  'username',
                  'realname',
                  'phone_num',
                  'email',
                  'age'
                );
              });
          });
          it.only('status:404, invalid user id', () => {
            return request
              .get('/api/users/mike')
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Not Found');
              });
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
