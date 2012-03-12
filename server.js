/* server.js: run this with Node.js in the publish/ folder to start your server.
 * Copyright © 2011 Jan Keromnes, Thaddee Tyl. All rights reserved.
 * Code covered by the LGPL license. */


// Import the modules we need
var spice = require('./lib/spice.js'),  // NASA data tools
    camp = require('./camp/camp.js');   // WebApp server


// The data we will be working with
var data = {};


// Load the Solar System PCK file we got from NASA's SPICE data
spice.readPCK('../data/pck00010.tpc', require('./data/naif_ids.json'), function(PCK) {
  data = PCK;
  console.log(data);
});


// Start the server with options from argv (e.g. `sudo node server.js 80 no 0`)
camp.start({
  port: +process.argv[2],
  secure: process.argv[3] === 'yes',
  debug: +process.argv[4]
});
