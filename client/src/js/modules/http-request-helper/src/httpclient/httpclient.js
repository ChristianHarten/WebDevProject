/*
 * Hilfsmodul um Requests mit d3 auszuführen
 */
let HttpClient = function (d3) {
	this.get = function (url, callback) {
		d3.json(url, function (data) {
			callback(data);
		});
	};
};

module.exports = HttpClient;