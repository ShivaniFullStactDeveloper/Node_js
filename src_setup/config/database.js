// const { Pool } = require('pg');

// const pool = new Pool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// pool.on('connect', () => {
//   console.log('Connected to the database');
// });
// pool.on('error', (err) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// module.exports = pool;
// ----------------------------------------------
// const { Pool } = require("pg");

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// pool.on("connect", () => {
//   console.log("Connected to PostgreSQL");
// });

// pool.on("error", (err) => {
//   console.error("PostgreSQL error:", err);
// });

// module.exports = pool;

// ----------------------------------------------
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 🔑 FORCE first connection
pool
  .query("SELECT 1")
  .then(() => {
    console.log("Connected to PostgreSQL");
  })
  .catch((err) => {
    console.error("PostgreSQL connection failed:", err);
  });

module.exports = pool;
