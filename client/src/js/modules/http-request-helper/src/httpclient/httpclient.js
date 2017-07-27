/*
 * Hilfsmodul um Requests mit jQuery auszuführen
 */
const $ = require("jquery");
let HttpClient = function () {
	this.get = function (url, callback) {
		$.getJSON(url, function (data) {
			callback(data);
		});
	};
};

module.exports = HttpClient;