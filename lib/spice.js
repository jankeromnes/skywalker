/* spice.js: Tools for handling NASA SPICE data
 * Warning: These utilities are loosely based on my own understanding of the
 * SPICE Toolkit (http://naif.jpl.nasa.gov/naif/toolkit.html)
 */


// Import the modules we need
var fs = require('fs');  // File System API


// Load a Planetary Constants Kernel (PCK file) into a JSON object
function readPCK ( filepath, bodycodes, callback ) {

  // This is the PCK JSON object we will return once complete
  var PCK = {};

  // Read the file from its path on disk
  fs.readFile(filepath, function(error, content) {

    // Stop of there was an error
    if (error) throw error;

    // Divide file content into lines
    var lines = (content + '').split('\n');

    // File begins with text, not data
    var isdata = false;

    // Parse line-by-line
    for ( var i = 0 ; i < lines.length ; i++ ) {

      // Trim lines
      var line = lines[i].trim();


      // Skip empty lines
      if ( line.length === 0 ) continue;

      if ( isdata ) {

        // Expecting data or \begintext
        if ( line === '\\begintext' ) { isdata = false; continue; }

        if ( line[0] === 'B' ) {
          var match = line.match(/^BODY([\-0-9]*)_([_A-Z]*)\s*=(.*)$/);
          var code = match[1], key = match[2], vals = match[3].trim();
          var name = bodycodes[code];
          if (!name) {
            console.log('ERROR: Unknown NAIF Body', code, key, vals);
          } else {
            PCK[name] = PCK[name] || {};
            PCK[name][key] = PCK[name][key] || [];
            while (vals.length > 0 && vals[0].match(/^[\(\-0-9]/)) {
              var tokens = vals.split(/\s+/);
              for (var j = 0; j < tokens.length; j++) {
                var val = parseFloat(tokens[j]);
                if (!isNaN(val)) PCK[name][key].push(val);
              }
              vals = lines[++i].trim();
            }
            i--;
          }
        }


      } else {

        // Expecting text or \begindata
        if ( line === '\\begindata' ) { isdata = true; }

      }

    }

    // Return the complete PCK JSON object
    callback(PCK);

  });
};


// Export module functions
exports.readPCK = readPCK;
