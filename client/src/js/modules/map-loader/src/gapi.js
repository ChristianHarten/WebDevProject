const jsonp = require("jsonp");
let gapiurl = "http://maps.googleapis.com/maps/api/js?callback=__googleMapsApiOnLoadCallback";
let firstLoad = true;
exports.load = function(done) {
    if (firstLoad) {
		jsonp(gapiurl, "__googleMapsApiOnLoadCallback", done);
	}
	firstLoad = false;
};