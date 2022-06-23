'use strict';

require('dotenv').config();
const { db } = require('./src/auth/models');
const server = require('./auth-server/src/server.js');

db.sync()
  .then(() => {
    console.log('Successful Connection');
  })
  .catch(e => console.error(e));

server.start();
