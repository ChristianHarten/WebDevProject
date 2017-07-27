/*
 * Hilfsmodul für das Anzeigen der Map, Tracks, Anmelden der EventListener usw
 */
const maputils = require("../../map-utils");

let ElementTools = function (trackArray) {
	let _this = this,
		currentPage = 1,
		pages,
		tracks = trackArray,
		map = new maputils.MapLoader();;
	/*
	 * öffentliche Funktion zur Anzeige der Tracks
	 */
	this.displayTracks = function () {
		// Berechne Anzahl der anzuzeigenden Tracks, abhängig von der Größe der Sidbar ohne den PageNav Container
		// 25px pro Element
		let height = document.getElementById("sidebar").clientHeight;
		let pageNavHeight = document.getElementsByClassName("pageNavContainer")[0].clientHeight;
		let elementCount = Math.floor((height - pageNavHeight - 7) / 25);

		// Gesamtanzahl an Pages, in die die Tracks aufgeteilt werden
		pages = Math.ceil(tracks.length / elementCount);

		// Muss nach resize event angepasst werden, currentPage kann sonst größer sein als pages
		if (currentPage > pages) {
			currentPage = pages;
		}
		// Paginierung des Arrays
		let paginatedTracksArray = paginate(tracks, elementCount, currentPage);

		// entferne EventListener der aktuellen Element, damit diese nicht mehrfach angemeldet werden
		removeTrackEventListener();
		// hier passiert das eigentlich Anzeigen der Tracks
		drawTracks(paginatedTracksArray, elementCount);
		// melde Click Listener an PageNav Buttons an
		addPageNavEventListener();
		// melde Click Listener an Track Elemente an
		addTrackEventListener();
		// update Seitenanzeige der PageNavigation
		updatePages();
	};

	/*
	 * Funktion zum Anzeigen der Tracks auf der Seite
	 * Tracks werden in span Elemente gepackt, bekommen ein Dataset zur Identifizierung im Original Array
	 * Hintergrund abwechselnd leightgrey / weiß
	 */
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
	/*
	 * Leert Sidebar nach resize
	 */
	function clearSidebar() {
		document.getElementById("sidebar-items").innerHTML = "";
	}
	/*
	 * Update der Seitenanzeige der PageNav
	 */
	function updatePages() {
		document.getElementById("currentPage").innerHTML = currentPage.toString();
		document.getElementById("allPages").innerHTML = pages.toString();
	}


	// private Funktion zum Paginieren des Arrays
	// Array wird in Bereiche geteilt, Bereich wird zurückgegeben
	function paginate(array, pageSize, pageNumber) {
		--pageNumber;
		let startIndex = pageNumber * pageSize;
		let endIndex = (pageNumber + 1) * pageSize > array.length ? array.length : (pageNumber + 1) * pageSize;
		return array.slice(startIndex, endIndex);
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
	/*
	 * Handler Funktion für Click auf Track Element
	 * Weist map Objekt an, Pfad zu zeichnen (Höhenprofil wird ebenfalls in Map gezeichnet
	 */
	function handleTrackClick(ev) {
		let el = ev.target;
		let indexPosition = el.dataset.id;
		let drawableCoordinates = tracks[indexPosition];
		map.drawTrack(drawableCoordinates);
	}
	/*
	 * Handler Funktion für Click auf PageNav Button
	 */
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
	/*
	 * Debounce Funktion: verhindert das ständige feuern des resize events mithilfe eines Timers
	 */
	let timer;
	window.addEventListener("resize", function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			clearSidebar();
			_this.displayTracks();
			map.updateElevationChart();
		}, 250);
	});
};


module.exports = ElementTools;
