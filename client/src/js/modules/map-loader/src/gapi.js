/**
 * Module that actually loads google maps api
 */
const jsonp = require("jsonp");
let gapiurl = "http://maps.googleapis.com/maps/api/js?callback=__googleMapsApiOnLoadCallback";
let chartapiurl = "https://www.gstatic.com/charts/loader.js";

// loads maps api 1 time
let firstLoad = true;
exports.load = function (done) {
	if (firstLoad) {
		console.log("Hallo");
		loadVisualizationApi();
		jsonp(gapiurl, "__googleMapsApiOnLoadCallback", done);
	}
	firstLoad = false;
};

/**
 * Loads google visualization api to display elevation chart
 */
function loadVisualizationApi() {
	let chartApiScript = document.createElement("script");
	chartApiScript.type = "text/javascript";
	chartApiScript.src = chartapiurl;
	document.head.appendChild(chartApiScript);
	chartApiScript.onload = function () {
		google.charts.load("current", {packages: ["corechart"]});
		google.charts.setOnLoadCallback(function () {
			console.log("visualization api ready!");
		});
	};
}