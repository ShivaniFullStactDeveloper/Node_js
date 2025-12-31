// db-server.js
const { Pool } = require("pg");

const database = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres", // jo password aapne set kiya
  port: 5432,
});

// database.on("connect", () => {
//   console.log("Database connected");
// });

database.connect((err) => {
    if (err) {
      console.log("Database not connected");
    } else {
      console.log("Database connected");
    }
});

module.exports = database;
