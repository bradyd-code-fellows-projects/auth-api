'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');
const logger = require('./middleware/logger.js');
const v1Routes = require('./routes/v1.js');
const PORT = process.env.PORT || 3002;

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: () => {
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });
  },
};