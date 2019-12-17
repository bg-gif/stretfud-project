const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';
const { username, password } = require('./private/config');

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};
const customConfig = {
  development: {
    connection: {
      database: 'stretfud',
      username,
      password
    }
  },
  test: {
    connection: {
      database: 'stretfud_test',
      username,
      password
    }
  },
  production: {
    connection: `${DB_URL}?ssl=true`
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };
