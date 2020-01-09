// Update with your config settings.
require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    useNullAsDefault: true,
    pool: {
      min: 1,
      max: 10,
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
 
  production: {
     client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    },
    useNullAsDefault: true
  }
};
