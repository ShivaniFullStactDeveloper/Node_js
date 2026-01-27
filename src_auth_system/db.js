const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  const res = await pool.query("SELECT current_database()");
  console.log("DB CONNECTED TO 👉", res.rows[0].current_database);
})();

module.exports = pool;
