const ENV = process.env.NODE_ENV || 'development';

const knexMaker = require('knex');

const dbConfig =
  ENV === 'production'
    ? { clint: 'pg', connection: process.env.DATABASE_URL }
    : require('../knexfile');

const connection = knexMaker(dbConfig);

module.exports = connection;
