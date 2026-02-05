const express = require('express');
const routes = require('./routes/index');
const errorMiddleware = require('./middleware/errorMiddleware');


const app = express();
app.use(express.json());
app.use('/api', routes);

app.use(errorMiddleware)

module.exports = app;
