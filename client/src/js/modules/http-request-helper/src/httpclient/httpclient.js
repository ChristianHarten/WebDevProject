/**
 * Helper class to perform requests
 * @constructor
 */
const $ = require("jquery");
/*let HttpClient = function () {

	this.get = function (url, callback) {
		let request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (request.readyState === 4 && request.status === 200) {
				callback(request.responseText);
			}
		};
		request.open("GET", url, true);
		request.send(null);
	};
};*/

let HttpClient = function () {
	this.get = function (url, callback) {
		$.getJSON(url, function (data) {
			callback(data);
		});
	};
};

module.exports = HttpClient;