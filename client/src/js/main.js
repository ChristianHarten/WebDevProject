//main file for client app
//loads modules and invokes methods to do work
const mapLoader = require("./modules/map-loader");
const HttpClient = require("./modules/http-request-helper");

let mapUtils = new mapLoader.Loader();
let gapi = mapLoader.Gapi;
let tracksArray;
let client = new HttpClient.HttpClient();
let currentPage = 1;
let pages;

// get request, loads default map part
client.get("http://localhost:8080/data/list", function (response) {
	tracksArray = JSON.parse(response);
	loadMapPart(tracksArray[0].features[0].geometry.coordinates[0][1], tracksArray[0].features[0].geometry.coordinates[0][0]);
	calculateElements();
});

addPageNavEventListeners();

// resize debounce function
let timer;

window.addEventListener('resize', function () {
	clearTimeout(timer);
	timer = setTimeout(function () {
		clearSiedebar();
		calculateElements();
	}, 250);
});

// clear sidebar after resize and page change
function clearSiedebar() {
	document.getElementById("sidebar-items").innerHTML = "";
}

// divides array in propotion of rendered container size
function paginate(array, pageSize, pageNumber) {
	--pageNumber;
	return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
}

// calculates element amount, writes them in html container, adds event listeners
function calculateElements() {
	let height = document.getElementById("track").clientHeight;
	let pageNavHeight = document.getElementsByClassName("pageNavContainer")[0].clientHeight;
	let elementCount = Math.floor((height - pageNavHeight - 7) / 25); // 25px per track
	let paginatedTracksArray = paginate(tracksArray, elementCount, currentPage);
	pages = Math.ceil(tracksArray.length / elementCount);

	showTracks(paginatedTracksArray);
	addEventListeners();
}

function loadMapPart(lat, lng) {
	gapi.load(function () {
		mapUtils.initMap(lat, lng);
	});
}

function showTracks(paginatedTrackArray) {
	for (let i = 0; i < paginatedTrackArray.length; i++) {
		let trackName = paginatedTrackArray[i].features[0].properties.name;
		let spanElement = document.createElement("span");

		spanElement.className += "navigationElement";
		spanElement.dataset.id = i; // index in array, for later access

		if (i % 2 === 0) {
			spanElement.style.background = "lightgrey";
		}
		else {
			spanElement.style.background = "white";
		}

		let node = document.createTextNode(trackName);
		spanElement.appendChild(node);

		let sidebarContainer = document.getElementById("sidebar-items");
		sidebarContainer.appendChild(spanElement);
	}
}

function addPageNavEventListeners() {
	let pageNavButtons = document.getElementsByClassName("pageNav");
	for (let i = 0; i < pageNavButtons.length; i++) {
		pageNavButtons[i].addEventListener("click", function (ev) {
			let el = ev.target;
			if (el.id === "backButton") {
				currentPage--;
				if (currentPage < 1) {
					currentPage = 1;
				}
			}
			if (el.id === "forwardButton") {
				currentPage++;
				if (currentPage > pages) {
					currentPage = pages;
				}
			}
			console.log(currentPage);
			clearSiedebar();
			calculateElements();
		});
	}
}

function addEventListeners() {
	let trackElement = document.getElementsByClassName('navigationElement');
	for (let i = 0; i < trackElement.length; i++) {
		trackElement[i].addEventListener('click', function (ev) {
			let el = ev.target;
			let indexPosition = el.dataset.id;
			let drawableCoordinates = [];
			for (let i = 0; i < tracksArray[indexPosition].features[0].geometry.coordinates.length; i++) {
				drawableCoordinates.push({
					lat: tracksArray[indexPosition].features[0].geometry.coordinates[i][1],
					lng: tracksArray[indexPosition].features[0].geometry.coordinates[i][0]
				});
			}
			loadMapPart(tracksArray[indexPosition].features[0].geometry.coordinates[0][1], tracksArray[indexPosition].features[0].geometry.coordinates[0][0]);
			mapUtils.drawTrack(drawableCoordinates);
		});
	}
}
