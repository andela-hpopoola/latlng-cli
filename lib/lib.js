'use strict'

const inquirer = require('inquirer'); // for prompt
const request = require('request');  // to connect to Google Map Api

// GoogleMapApi is used to prevent `Daily request quota has been exceeded` error
const GoogleMapApi = 'AIzaSyDmvSOAo4Wm5iHjlSCKvoNfvfOOg63wSag';

/*
 *  getLocation asks user for a Location
 *  Returns String
 */
var getLocation = function(callback){

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
var getLatLng = function(location) {

  // Housekeeping to inform the user that his request is processing
  console.log(`\nConnecting to Server...`);
  console.log(`Getting necessary information on ${location}`);

  var encodedLocation = encodeURIComponent(location);

  request({
    // Google Api URL
    url: `https://maps.googleapis.com/maps/api/geocode/json?key=${GoogleMapApi}&address=${encodedLocation}`,
    json: true 
  }, function (error, response, body) {

    if (error) {
      console.log('Unable to connect to Google servers.');

    } else if (body.status === 'ZERO_RESULTS') {
      console.log('Unable to find location.');

    } else if (body.status === 'OVER_QUERY_LIMIT'){
    	console.log('Daily request quota has been exceeded');

    } else if (body.status === 'OK') { //Output the result
      console.log(`\n`);
      console.log(`Result Found`);
      console.log(`--------------------------------------------------\n`);
      console.log(`Location Name: \t ${body.results[0].formatted_address}`);
      console.log(`Latitude: \t ${body.results[0].geometry.location.lat}`);
      console.log(`Longitude: \t ${body.results[0].geometry.location.lng}`);
      console.log(`\n--------------------------------------------------\n`);
    }
  });

};


module.exports = {
	getLocation: getLocation,
  getLatLng: getLatLng
}
