const jsonp = require("jsonp");

let gapiurl = "http://maps.googleapis.com/maps/api/js?callback=__googleMapsApiOnLoadCallback";

exports.load = function(done) {
    jsonp(gapiurl, "__googleMapsApiOnLoadCallback", done);
};