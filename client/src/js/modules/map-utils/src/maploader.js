/*
 * Hilfsmodul für Map Operationen, zeichnen der Pfade auf Map, Anzeigen des Höhenprofils mit d3
 */
const L = require("leaflet");

let MapLoader = function (d3) {
	let _this = this,
		map = init(),
		trackStyle = {
			"color": "#ff0000",
			"weight": 2,
			"opacity": 0.7
		},
		trackLayer,
		heightData = [],
		bounds = [],
		maxHeight;

	/*
	 * Erhält GeoJSON Feature und zeichnet darin enthaltene Koordinaten auf Map
	 * Entfernt Layer, falls vorhanden und setzt diesen neu
	 * Zentriert Map auf diesen Pfad und updatet Höhenprofil
	 */
	this.drawTrack = function (coordinates) {
		if (trackLayer) {
			map.removeLayer(trackLayer);
		}
		trackLayer = L.geoJSON(coordinates, {
			style: trackStyle,
			onEachFeature: saveHeightDataAndCenterBounds
		}).addTo(map);

		_this.resizeMap();
		_this.updateElevationChart();
	};
	this.updateElevationChart = function () {
		displayElevation();
	};
	this.resizeMap = function () {
		map.fitBounds(bounds);
	};

	/*
	 * private Hilfsfunktion, speichert Höhendaten des GeoJSON Features und maximale Höhe für y Achse
	 * Speichert Koordinaten als L.LatLng um Karte mit diesen Koordinaten zu zentrieren
	 */
	function saveHeightDataAndCenterBounds(feature) {
		maxHeight = 0;
		let len = feature.geometry.coordinates.length;
		if (heightData.length) {
			heightData.length = 0;
		}
		if (bounds.length) {
			bounds.length = 0;
		}
		// push 0 am Anfang und Ende für schönere Kurve. Da gibts sicher einen schöneren Weg, hm
		for (let i = 0; i < len; i++) {
			if (i === 0) {
				heightData.push(0);
			}
			let currentHeight = feature.geometry.coordinates[i][2];
			heightData.push(currentHeight);

			let corner = new L.LatLng(feature.geometry.coordinates[i][1], feature.geometry.coordinates[i][0]);
			bounds.push(corner);

			maxHeight = Math.max(currentHeight, maxHeight);
			if (i === len - 1) {
				heightData.push(0);
			}
		}
	}

	/*
	 * private Funktion, initialisiert Map mit Tiles etc, zentriert auf Trier
	 */
	function init() {
		let tmpMap = L.map("map", {zoomControl: false});
		let osmTiles = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
		let attribution = "© OpenStreetMap";
		L.Icon.Default.imagePath = "../leaflet/images";

		L.tileLayer(osmTiles, {
			maxZoom: 18,
			attribution: attribution
		}).addTo(tmpMap);
		tmpMap.setView([13.374711, 3.140815], 12);
		return tmpMap;
	}

	/*
	 * private Funktion zum Berechnen und Anzeigen des Höhenprofils
	 */
	function displayElevation() {
		// entferne Chart, falls vorhanden; Prüfung nach Existenz nicht notwendig
		d3.select("#elev").remove();

		// lese Dimensionen der Map aus und berechne Höhe und Breite des Charts in deren Abhängigkeit
		// Höhe maximal 120px, evtl hier noch nachbessern, sieht auf manchen Screens zu klein aus
		let dimensions = d3.select("#map").node().getBoundingClientRect();
		let margin = {top: 15, right: 15, bottom: 15, left: 30},
			width = dimensions.width / 4,
			height = dimensions.height / 3 > 120 ? 120 : dimensions.height / 3;

		// Anzahl der Datenelemente
		let n = heightData.length;
		// Gibt ein Array der Länge n zurück. Jeder Eintrag ist key-value Paar, wobei
		// key = y und value = datenelement
		let dataset = d3.range(n).map(function (d) {
			return {"y": heightData[d]}
		});

		// skaliert x Achse in Abhängigkeit der Breite und Anzahl der Datenelemente
		let xScale = d3.scaleLinear()
			.domain([0, n - 1]) // input
			.range([0, width]); // output

		// skaliert y Achse in Abhängikeit von Höhe  und maximaler Höhe in GeoJSON Feature
		let yScale = d3.scaleLinear()
			.domain([0, maxHeight]) // input
			.range([height, 0]); // output

		// d3's line generator
		let line = d3.line()
			.x(function (d, i) {
				return xScale(i);
			})
			.y(function (d) {
				return yScale(d.y);
			})//.curve(d3.curveMonotoneX)
			;// apply smoothing to the line

		// Füge SVG zur Seite hinzu (in elevationChart div)
		let svg = d3.select("#elevationChart")
			.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("id", "elev")
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// x Achse in group tag
		svg.append("g")
			.attr("class", "axisWhite")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(xScale).ticks(0));

		// y Achse in group tag
		svg.append("g")
			.attr("class", "axisWhite")
			.call(d3.axisLeft(yScale).ticks(4));

		// Füge path tag hinzu, binde Daten an path und rufe d3 line generator auf
		svg.append("path")
			.datum(dataset)
			.attr("class", "line")
			.attr("d", line);
	}
};

module.exports = MapLoader;