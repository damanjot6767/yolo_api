
'use strict';

/***********************************
 **** node module defined here *****
 ***********************************/
const path = require('path');
require('dotenv').config();
const EXPRESS = require("express");
const CONFIG = require('./config');
/**creating express server app for server */
const app = EXPRESS();



/********************************
 ***** Server Configuration *****
 ********************************/
app.set('port', CONFIG.server.PORT);
app.use(EXPRESS.static(path.join(__dirname, 'public')));
// configuration to setup socket.io on express server.
const server = require('http').Server(app);
// const io = require('socket.io')(server);
global.io = require('socket.io')(server);

/** Server is running here */
let startNodeserver = async () => {
  // express startup.
  await require(`./app/startup/stmina/expressStartup`)(app);
  // // start socket on server
  // await require(`./app/socket/stmina/socket`).connect(global.io);

  return new Promise((resolve, reject) => {
    server.listen(process.env.PORT || CONFIG.server.PORT, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};


startNodeserver()
  .then(() => {
    console.log('Node server running on ', CONFIG.server.URL);
  }).catch((err) => {
    console.log('Error in starting server', err);
    process.exit(1);
  });

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error);
});
