const express = require('express');
const routes = require('./routes/index');
const errorMiddleware = require('./middleware/errorMiddleware');


const app = express();
app.use(express.json());
app.use('/api', routes);


app.use((err, req, res, next) => {
    console.error(err);
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong',
    });
  });
  
  app.use(errorMiddleware)

module.exports = app;
