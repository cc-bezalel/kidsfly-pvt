// const knex = require("knex");
// const knexConfig = require("../knexfile");
// const environment = process.env.NODE_ENV || "production";
// const db = knex(knexConfig[environment]);

// // uncomment to reset server on every reload
// db.migrate
//   .rollback()
//   .then(() => db.migrate.latest())
//   .then(() => db.seed.run());

// module.exports = db;


const knexConfig = require("../knexfile");
const dbEnv = process.env.NODE_ENV || "production";

module.exports = require("knex")(knexConfig[dbEnv]);
