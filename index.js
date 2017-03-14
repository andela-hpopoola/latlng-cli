'use strict'

const figlet = require('figlet');
const chalk = require('chalk');
// Import the lib for all functions
const lib = require('./lib/lib');

// dislay the figlet Header
figlet('LATLNG', function(err, data) {

	if (err) {
	  console.log('Something went wrong...');
	  console.dir(err);
	  return;
	}
	console.log();
    console.log(chalk.gray(data));
    console.log();

    /*
	 *  getLocation displays prompt 
	 *  asking the user to write the location 
	 *  returns a string
	 */
	lib.getLocation(function(result){

		// user input is saved in location
		var location = result.location;

		/*
		 *  getLatLng connects to the Google Map API
		 *  and search for details of the location
		 */
		lib.getLatLng(location);
	});

      
});
