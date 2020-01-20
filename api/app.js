'use strict';

// load modules
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const database = require('./models').sequelize;
const dbName = process.env.DB_NAME;

// import routes
const adminRoute = require('./routes/adminRoute');
const packageRoute = require('./routes/packageRoute');
const pricingRoute = require('./routes/pricingRoute');
const reviewRoute = require('./routes/reviewRoute');
const serviceRoute = require('./routes/serviceRoute');
const galleryRoute = require('./routes/galleryRoute');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING;

// create the express app
const app = express();

// enable all CORS requests
app.use(cors(
  {
    exposedHeaders: ['*']
  }
));

// test the connection to the database
(async () => {
  try {
    await database.authenticate();
    console.log(`Successfully connected to ${dbName}`);
  } catch (err) {
    console.error(`Unable to connect to ${dbName}: `, err);
  }
})();

// setup express to use json
app.use(express.json());

// setup morgan to enable http request logging
app.use(morgan('dev'));

// setup home greeting route
app.get('/', (req, res) => {
  res.json({
    message: 'Moore Than Detailing API',
  })
});

// include api routes
app.use('/uploads', express.static('uploads'));
app.use('/api', adminRoute);
app.use('/api', packageRoute);
app.use('/api', pricingRoute);
app.use('/api', reviewRoute);
app.use('/api', serviceRoute);
app.use('/api', galleryRoute);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup global error handler
app.use((error, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler:  ${JSON.stringify(error.stack)}`);
  }

  res.status(error.status || 500).json({
    message: error.message,
    error: {},
  });
});

// set port for the api
app.set('port', process.env.PORT || 5000);

// start listening on the port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listenening on port ${server.address().port}`);
});