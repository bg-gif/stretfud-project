const ENV = process.env.NODE_ENV || 'test';

const testData = require('./test/index');

const data = {
  test: testData
};

module.exports = data[ENV];
