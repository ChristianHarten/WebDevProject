/*
 * Hilfsmodul für das Anzeigen der Map, Tracks, Anmelden der EventListener usw
 */
let ElementTools = function (d3, maputils, trackArray) {
	let _this = this,
		currentPage = 1,
		pages,
		tracks = trackArray,
		map = maputils;
	/*
	 * öffentliche Funktion zur Anzeige der Tracks
	 */
	this.displayTracks = function () {
		// Berechne Anzahl der anzuzeigenden Tracks, abhängig von der Größe der Sidbar ohne den PageNav Container
		// 25px pro Element
		let height = d3.select("#sidebar").node().getBoundingClientRect().height;
		let pageNavHeight = d3.select(".pageNavContainer").node().getBoundingClientRect().height;
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
			let index = i + ((currentPage - 1) * elementCount);

			let span = d3.select("#sidebar-items")
				.append("span")
				.attr("class", "navigationElement")
				.attr("data-index", index)
				.text(trackName);

			if (i % 2) {
				span.attr("style", "background-color: white");
			}
			else {
				span.attr("style", "background-color: lightgrey");
			}
		}
	}

	/*
	 * Leert Sidebar nach resize
	 */
	function clearSidebar() {
		d3.select("#sidebar-items").selectAll("*").remove();
	}

	/*
	 * Update der Seitenanzeige der PageNav
	 */
	function updatePages() {
		d3.select("#currentPage").text(currentPage.toString());
		d3.select("#allPages").text(pages.toString());
	}


	// private Funktion zum Paginieren des Arrays
	// Array wird in Bereiche geteilt, Bereich wird zurückgegeben
	function paginate(array, pageSize, pageNumber) {
		let startIndex = --pageNumber * pageSize;
		let endIndex = (pageNumber + 1) * pageSize > array.length ? array.length : (pageNumber + 1) * pageSize;
		return array.slice(startIndex, endIndex);
	}

	function removeTrackEventListener() {
		d3.selectAll(".navigationElement").on("click", null);

	}

	function addTrackEventListener() {
		d3.selectAll(".navigationElement").on("click", handleTrackClick);
	}

	let listenerAdded = false;

	function addPageNavEventListener() {
		if (!listenerAdded) {
			d3.selectAll(".pageNav").on("click", handlePageNavClick);
			listenerAdded = true;
		}
	}

	/*
	 * Handler Funktion für Click auf Track Element
	 * Weist map Objekt an, Pfad zu zeichnen (Höhenprofil wird ebenfalls in Map gezeichnet
	 */
	function handleTrackClick() {
		let el = d3.event.target;
		let indexPosition = el.dataset.index;
		let drawableCoordinates = tracks[indexPosition];
		map.drawTrack(drawableCoordinates);
	}

	/*
	 * Handler Funktion für Click auf PageNav Button
	 */
	function handlePageNavClick() {
		let el = d3.event.target;
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
	 * Debounce Funktion: verhindert das ständige Auslösen des resize events mithilfe eines Timers
	 */
	let timer;
	window.addEventListener("resize", function () {
		clearTimeout(timer);
		timer = setTimeout(function () {
			clearSidebar();
			_this.displayTracks();
			map.resizeMap();
			map.updateElevationChart();
		}, 250);
	});
};


module.exports = ElementTools;
