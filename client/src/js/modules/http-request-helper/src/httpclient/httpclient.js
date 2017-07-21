let HttpClient = function () {
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
};

module.exports = HttpClient;