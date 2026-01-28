// require('dotenv').config();
// const app = require('./app');

// const PORT = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


require("dotenv").config();
// Initialize database connection
require("./config/database");
// Initialize routes
const app = require("./app");
// Set port
const PORT = process.env.PORT || 3000;
// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
