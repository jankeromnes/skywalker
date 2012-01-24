/* server.js: run this with Node.js in the publish/ folder to start your server.
 * Copyright © 2011 Jan Keromnes, Thaddee Tyl. All rights reserved.
 * Code covered by the LGPL license. */

var camp = require('./camp/camp').start({
  port: 80,
  secure: false,
  debug: 10
});

