/**
 * Helper class for calculating elements, showing tracks, adding event listeners etc
 */
const mapLoader = require("../../map-loader");
let Calculator = function (trackArray, html) {
	let _this = this,
		htmlhelper = html,
		mapUtils = new mapLoader.Loader(),
		gapi = mapLoader.Gapi,
		tracksArray = trackArray,
		currentPage = 1,
		pages,
		elementCount,
		zoomFactor = 10;
	/**
	 * Loads map at specific coordinates
	 * @param lat lat coordinate
	 * @param lng lng coordinate
	 */
	this.loadMapPart = function (lat, lng) {
		gapi.load(function () {
			mapUtils.initMap(lat, lng, zoomFactor);
		});
	};
	/**
	 * calculates and displays the amount of tracks, which fits in rendered container size and adds event listeners to tracks for drawing on the map
	 */
	this.calculateElements = function () {
		let height = document.getElementById(htmlhelper.sidebarID()).clientHeight;
		let pageNavHeight = document.getElementsByClassName(htmlhelper.pageNavigationContainerID())[0].clientHeight;
		elementCount = Math.floor((height - pageNavHeight - 7) / 25); // 25px per track, why 7? it works lol
		pages = Math.ceil(tracksArray.length / elementCount);
		// currentPage = pages after resize to prevent currentPage from getting to big
		if (currentPage > pages) {
			currentPage = pages;
		}
		let paginatedTracksArray = _this.paginate(tracksArray, elementCount, currentPage);

		_this.removeEventListeners();
		_this.displayTracks(paginatedTracksArray);
		_this.addEventListeners();
		_this.updatePages();
	};
	/**
	 * Function to display tracks in container
	 * @param paginatedTrackArray
	 */
	this.displayTracks = function (paginatedTrackArray) {
		for (let i = 0; i < paginatedTrackArray.length; i++) {
			let trackName = paginatedTrackArray[i].features[0].properties.name;
			let spanElement = document.createElement("span");

			spanElement.className += htmlhelper.trackElementID();
			spanElement.dataset.id = i + ((currentPage - 1) * elementCount); // index in array, for later access

			if (i % 2) {
				spanElement.style.background = "lightgrey";
			}
			else {
				spanElement.style.background = "white";
			}

			let node = document.createTextNode(trackName);
			spanElement.appendChild(node);

			let sidebarContainer = document.getElementById(htmlhelper.sidebarItemContainerID());
			sidebarContainer.appendChild(spanElement);
		}
	};
	this.updatePages = function () {
		document.getElementById(htmlhelper.currentPageID()).innerHTML = currentPage.toString();
		document.getElementById(htmlhelper.allPagesID()).innerHTML = pages.toString();
	};
	/**
	 * Paginates array
	 * @param array array to paginate
	 * @param pageSize amount of elements you want to display
	 * @param pageNumber number of current page
	 * @returns {*|ArrayBuffer|Blob|Array|Buffer|string} paginated array
	 */
	this.paginate = function (array, pageSize, pageNumber) {
		--pageNumber;
		return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
	};
	/**
	 * Clears sidebar after resize or change of page by user
	 */
	this.clearSidebar = function () {
		document.getElementById(htmlhelper.sidebarItemContainerID()).innerHTML = "";
	};
	this.setZoomFactor = function (zoom) {
		zoomFactor = zoom;
	};
	/**
	 * Removes Listeners to prevent more than one registration
	 */
	this.removeEventListeners = function () {
		let trackElement = document.getElementsByClassName(htmlhelper.trackElementID());
		for (let i = 0; i < trackElement.length; i++) {
			trackElement[i].removeEventListener("click", _this.handleTrackClick);
		}
	};
	/**
	 * Function to add click listener to all tracks
	 */
	this.addEventListeners = function () {
		let trackElement = document.getElementsByClassName(html.trackElementID());
		for (let i = 0; i < trackElement.length; i++) {
			trackElement[i].addEventListener("click", _this.handleTrackClick);
		}
	};
	/**
	 * adds click listener to navigation elements
	 */
	this.addPageNavListeners = function () {
		let pageNavButtons = document.getElementsByClassName(htmlhelper.navigationButtonClass());
		for (let i = 0; i < pageNavButtons.length; i++) {
			pageNavButtons[i].addEventListener("click", _this.handlePageNavClick);
		}
	};
	/**
	 * Handles click event of page navigation elements
	 * @param ev Fired event
	 */
	this.handlePageNavClick = function (ev) {
		let el = ev.target;
		if (el.id === htmlhelper.prevButtonID()) {
			currentPage--;
			if (currentPage < 1) {
				currentPage = 1;
			}
		}
		if (el.id === htmlhelper.nextButtonID()) {
			currentPage++;
			if (currentPage > pages) {
				currentPage = pages;
			}
		}
		_this.clearSidebar();
		_this.calculateElements();
	};
	/**
	 * Handles click event of track element
	 * @param ev Fired event
	 */
	this.handleTrackClick = function (ev) {
		let el = ev.target;
		let indexPosition = el.dataset.id;
		// needed for maps api to understand format
		let drawableCoordinates = [];
		for (let i = 0; i < tracksArray[indexPosition].features[0].geometry.coordinates.length; i++) {
			drawableCoordinates.push({
				lat: tracksArray[indexPosition].features[0].geometry.coordinates[i][1],
				lng: tracksArray[indexPosition].features[0].geometry.coordinates[i][0]
			});
		}
		_this.loadMapPart(tracksArray[indexPosition].features[0].geometry.coordinates[0][1], tracksArray[indexPosition].features[0].geometry.coordinates[0][0]);
		mapUtils.drawTrack(drawableCoordinates, zoomFactor);
	};
	this.recenterMap = function () {
		mapUtils.recenter();
	};
	/**
	 * debounce function: sets timeout to prevent resize event from firing too often
	 */
	let timer;
	window.addEventListener("resize", function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			_this.clearSidebar();
			_this.calculateElements();
			_this.recenterMap();
		}, 250);
	});
};

module.exports = Calculator;
