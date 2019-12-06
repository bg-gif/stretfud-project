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
          it('status 200: returns an object with key of user and expected value', () => {});
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
