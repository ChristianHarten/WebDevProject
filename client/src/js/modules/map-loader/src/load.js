/**
 * Helper class to load, draw and recenter map
 * @constructor
 */
let Loader = function () {
	let map,
		track;
	this.initMap = function (lat, lng, zoom) {
		map = new google.maps.Map(document.getElementById("map"), {
			center: {lat: lat, lng: lng},
			zoom: zoom
		});
	};
	this.drawTrack = function (coordinatesArray, zoom) {
		if (track !== undefined) {
			track.setMap(null);
		}
		let center = new google.maps.LatLng(coordinatesArray[0].lat, coordinatesArray[0].lng);
		map.setCenter(center);
		map.setZoom(zoom);
		track = new google.maps.Polyline({
			path: coordinatesArray,
			strokeColor: "#ff0000",
			strokeOpacity: "0.8",
			strokeWeight: 2,
		});
		track.setMap(map);
	};
	this.recenterMap = function (center) {
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	};
	this.getMapCenter = function () {
		return map.getCenter();
	}
};

module.exports = Loader;