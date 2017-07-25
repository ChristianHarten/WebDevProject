const L = require("leaflet");

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
		map.setView([lat, lng], 13);
	};
	this.drawTrack = function (coordinates) {
		_this.setMapView(coordinates.features[0].geometry.coordinates[0][1], coordinates.features[0].geometry.coordinates[0][0]);
		if (trackLayer) {
			trackLayer.clearLayers();
		}
		trackLayer = L.geoJSON(coordinates, {
			style: trackStyle,
			onEachFeature: _this.test
		}).addTo(map);
		//trackLayer.addData(coordinates);
	};
	this.test = function (feature) {
		console.log(feature.geometry.coordinates[0][2]);
	};
};

function init() {
	let tmpMap = L.map("map");
	let osmTiles = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
	let attribution = "© OpenStreetMap";
	L.Icon.Default.imagePath = "../leaflet/images";

	L.tileLayer(osmTiles, {
		maxZoom: 18,
		attribution: attribution
	}).addTo(tmpMap);
	return tmpMap;
}

module.exports = MapLoader;