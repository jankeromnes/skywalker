/* spice.js: Tools for handling NASA SPICE data
 * Warning: These utilities are loosely based on my own understanding of the
 * SPICE Toolkit (http://naif.jpl.nasa.gov/naif/toolkit.html)
 */


// Import the modules we need
var fs = require('fs');               // File System API


// Load a Planetary Constants Kernel (PCK file) into a JSON object
function readPCK ( filepath, callback ) {

  // This is the PCK JSON object we will return once complete
  var PCK = {};

  // Read the file from its path on disk
  fs.readFile(filepath, function(error, content){

    // Stop of there was an error
    if (error) throw error;

    // Divide file content into lines
    var lines = (content + '').split('\n');

    // File begins with text, not data
    var isdata = false;

    // Parse line-by-line
    for ( var i = 0 ; i < lines.length ; i++ ) {

      // Skip empty lines
      if ( lines[i].match(/^\s*$/) ) continue;

      if ( isdata ) {

        // Expecting data or \begintext
        if ( lines[i].match(/^\s*\\begintext\s*$/) ) { isdata = false; continue; }

        console.log(lines[i]);

      } else {

        // Expecting text or \begindata
        if ( lines[i].match(/^\s*\\begindata\s*$/) ) { isdata = true; }

      }

    }

    // Return the complete PCK JSON object
    callback(PCK);

  });
};


// Export module functions
exports.readPCK = readPCK;
