const ENV = process.env.NODE_ENV || 'development';
const knexMaker = require('knex');

console.log(ENV);

const dbConfig =
  ENV === 'production'
    ? { client: 'pg', connection: process.env.DATABASE_URL }
    : require('../knexfile');

module.exports = knexMaker(dbConfig);
