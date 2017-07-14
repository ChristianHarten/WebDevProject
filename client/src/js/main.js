//main file for client app
//loads modules and invokes methods to do work
const mapLoader = require("./modules/map-loader");

let initLoading = new mapLoader.Loader();
let gapi = mapLoader.Gapi;

gapi.load(function () {
	initLoading.initMap(49.749992, 6.6371433);
});

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

let client = new HttpClient();
client.get("http://localhost:8080/data/list", function (response) {
	let test = document.getElementById("track");
	test.innerHTML = response;
});
