// const express = require('express');
// // const routes = require('./routes');

// const app = express();

// app.use(express.json());
// // app.use('/api', routes);

// module.exports = app;

const express = require('express');
const routes = require('./routes/index');

const app = express();
app.use(express.json());
app.use('/api', routes);

module.exports = app;
