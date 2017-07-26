const L = require("leaflet");
const d3 = require("d3");

let heightData = [],
	maxHeight;

let MapLoader = function () {
	let _this = this,
		map = init(),
		trackStyle = {
			"color": "#ff0000",
			"weight": 5,
			"opacity": 0.7
		},
		trackLayer;

	this.setMapView = function (lat, lng) {
		map.setView([lat, lng], 10);
	};
	this.drawTrack = function (coordinates) {
		_this.setMapView(coordinates.features[0].geometry.coordinates[0][1], coordinates.features[0].geometry.coordinates[0][0]);
		if (trackLayer) {
			map.removeLayer(trackLayer);
		}
		trackLayer = L.geoJSON(coordinates, {
			style: trackStyle,
			onEachFeature: saveHeightDataAndMaxHeight
		}).addTo(map);

		_this.updateElevationChart();
	};
	this.updateElevationChart = function () {
		displayElevation();
	}
};

function saveHeightDataAndMaxHeight(feature) {
	maxHeight = 0;
	let len = feature.geometry.coordinates.length;
	if (heightData.length) {
		heightData.length = 0;
	}
	for (let i = 0; i < len; i++) {
		if (i === 0) {
			heightData.push(0);
		}
		let currentHeight = feature.geometry.coordinates[i][2];
		heightData.push(currentHeight);
		maxHeight = Math.max(currentHeight, maxHeight);
		if (i === len - 1) {
			heightData.push(0); // hm
		}
	}
}

function init() {
	let tmpMap = L.map("map", {zoomControl: false});
	let osmTiles = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	let attribution = "© OpenStreetMap";
	L.Icon.Default.imagePath = "../leaflet/images";

	L.tileLayer(osmTiles, {
		maxZoom: 18,
		attribution: attribution
	}).addTo(tmpMap);
	return tmpMap;
}

function displayElevation() {
	d3.select("#elev").remove();
	let dimensions = d3.select("#map").node().getBoundingClientRect();
	let margin = {top: 15, right: 15, bottom: 15, left: 30}
		, width = dimensions.width / 4
		, height = dimensions.height / 3 > 120 ? 120 : dimensions.height / 3;

	// The number of datapoints
	let n = heightData.length;
	// An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is height of track
	let dataset = d3.range(n).map(function (d) {
		return {"y": heightData[d]}
	});

	let xScale = d3.scaleLinear()
		.domain([0, n - 1]) // input
		.range([0, width]); // output

	let yScale = d3.scaleLinear()
		.domain([0, maxHeight]) // input
		.range([height, 0]); // output

	// d3's line generator
	let line = d3.line()
		.x(function (d, i) {
			return xScale(i);
		}) // set the x values for the line generator
		.y(function (d) {
			return yScale(d.y);
		}) // set the y values for the line generator
		.curve(d3.curveMonotoneX);// apply smoothing to the line

	// Add the SVG to the page and employ #2
	let svg = d3.select("#elevationChart")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.attr("id", "elev")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Call the x axis in a group tag
	svg.append("g")
		.attr("class", "axisWhite")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(xScale).ticks(0)); // Create an axis component with d3.axisBottom

	// Call the y axis in a group tag
	svg.append("g")
		.attr("class", "axisWhite")
		.call(d3.axisLeft(yScale).ticks(4)); // Create an axis component with d3.axisLeft

	// Append the path, bind the data, and call the line generator
	svg.append("path")
		.datum(dataset) // 10. Binds data to the line
		.attr("class", "line") // Assign a class for styling
		.attr("d", line); // 11. Calls the line generator
}

module.exports = MapLoader;