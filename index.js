
// Import the lib for all functions
const lib = require('./lib/lib');

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