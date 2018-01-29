const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./passport')();
const routes = require('../app/routes/index');
const config = require('./config');
const logger = require('./logger')(module);
const AppError = require('../app/helpers/AppError');

const app = express();

// handle POST request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// logger, only in development
if (config.isDevelopment) {
  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// authentication middleware
app.use(auth.initialize());

// attach routes
app.use('/', routes);

// handle ValidationError
app.use(((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const msg = Object.keys(err.errors).map(field => err.errors[field].message);
    return next(new AppError(msg[0], 400));
  }
  return next(err);
}));

// catch 404 and forward
app.use((req, res, next) => {
  next(new AppError('Not Found', 404));
});

// error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err.message,
    stack: config.isDevelopment ? err.stack : {},
  });
});

module.exports = app;
