/**
 * Helper class for calculating elements, showing tracks, adding event listeners etc
 */
let ElementTools = function (trackArray, maploader) {
	let _this = this,
		currentPage = 1,
		pages,
		tracks = trackArray,
		map = maploader;

	this.displayTracks = function () {
		let height = document.getElementById("sidebar").clientHeight;
		let pageNavHeight = document.getElementsByClassName("pageNavContainer")[0].clientHeight;
		let elementCount = Math.floor((height - pageNavHeight - 7) / 25);
		pages = Math.ceil(tracks.length / elementCount);
		// currentPage = pages after resize to prevent currentPage from getting to big
		if (currentPage > pages) {
			currentPage = pages;
		}
		let paginatedTracksArray = paginate(tracks, elementCount, currentPage);

		removeTrackEventListener();
		drawTracks(paginatedTracksArray, elementCount);
		addPageNavEventListener();
		addTrackEventListener();
		updatePages();
	};

	function drawTracks(tracks, elementCount) {
		for (let i = 0; i < tracks.length; i++) {
			let trackName = tracks[i].features[0].properties.name;
			let spanElement = document.createElement("span");

			spanElement.className += "navigationElement";
			spanElement.dataset.id = i + ((currentPage - 1) * elementCount); // index in array, for later access

			if (i % 2) {
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

	function clearSidebar() {
		document.getElementById("sidebar-items").innerHTML = "";
	}

	function updatePages() {
		document.getElementById("currentPage").innerHTML = currentPage.toString();
		document.getElementById("allPages").innerHTML = pages.toString();
	}

	function paginate(array, pageSize, pageNumber) {
		--pageNumber;
		return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
	}

	function removeTrackEventListener() {
		let trackElements = document.getElementsByClassName("navigationElement");
		for (let i = 0; i < trackElements.length; i++) {
			trackElements[i].removeEventListener("click", handleTrackClick);
		}
	}

	function addTrackEventListener() {
		let trackElements = document.getElementsByClassName("navigationElement");
		for (let i = 0; i < trackElements.length; i++) {
			trackElements[i].addEventListener("click", handleTrackClick);
		}
	}

	let listenerAdded = false;

	function addPageNavEventListener() {
		if (!listenerAdded) {
			let pageNavButtons = document.getElementsByClassName("pageNav");
			for (let i = 0; i < pageNavButtons.length; i++) {
				pageNavButtons[i].addEventListener("click", handlePageNavClick);
			}
			listenerAdded = true;
		}
	}

	function handleTrackClick(ev) {
		let el = ev.target;
		let indexPosition = el.dataset.id;
		let drawableCoordinates = tracks[indexPosition];
		map.drawTrack(drawableCoordinates, 13);
	}

	function handlePageNavClick(ev) {
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
		clearSidebar();
		_this.displayTracks();
	}

	let timer;
	window.addEventListener("resize", function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			clearSidebar();
			_this.displayTracks();
		}, 250);
	});
};


module.exports = ElementTools;
