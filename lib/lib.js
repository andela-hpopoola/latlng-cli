'use strict'

const inquirer = require('inquirer'); // for prompt
const request = require('request');  // to connect to Google Map Api
const chalk = require('chalk');

// GoogleMapApi is used to prevent `Daily request quota has been exceeded` error
const GoogleMapApi = 'AIzaSyDmvSOAo4Wm5iHjlSCKvoNfvfOOg63wSag';

/*
 *  getLocation asks user for a Location
 *  Returns String
 */
var getLocation = function getLocation(callback){

	var questions = [
	  {
	    type: 'input',
	    name: 'location',
	    message: 'Enter a Location : ',
	    default: function () {
	      return 'Ikeja';
	    }
	  }
	];

	inquirer.prompt(questions).then(callback);
}


/*
 *  getLatLng - Used to get the details of a location.
 *  Outputs the location in a formatted way
 */
var getLatLng = function getLatLng(location) {

  // Housekeeping to inform the user that his request is processing
  console.log(chalk.dim.green("\nConnecting to Server..."));
  console.log(chalk.dim.green("Getting necessary information on %s"), location);

  var encodedLocation = encodeURIComponent(location);

  request({
    // Google Api URL
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${GoogleMapApi}&address=${encodedLocation}`,
    json: true 
  }, function (error, response, body) {

    if (error) {
      console.log(chalk.red('Unable to connect to Google servers.'));

    } else if (body.status === 'ZERO_RESULTS') {
      console.log(chalk.red('Unable to find location.'));

    } else if (body.status === 'OVER_QUERY_LIMIT'){
    	console.log(chalk.red('Daily request quota has been exceeded'));

    } else if (body.status === 'OK') { //Output the result
      console.log(chalk.dim.gray("--------------------------------------------------\n"));
      console.log(chalk.dim.white.bold("Location : \t" + body.results[0].formatted_address));
      console.log(chalk.yellow("Latitude : \t" + body.results[0].geometry.location.lat));
      console.log(chalk.yellow("Longitude: \t" + body.results[0].geometry.location.lng));
      console.log(chalk.dim.gray("\n--------------------------------------------------\n"));
    }
  });

};


module.exports = {
	getLocation: getLocation,
  getLatLng: getLatLng,
}
