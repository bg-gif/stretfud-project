const ENV = process.env.NODE_ENV || 'test';

const test = require('./test/index');
const development = require('./dev/index');

const data = {
  test,
  development,
  production: development
};

module.exports = data[ENV];
