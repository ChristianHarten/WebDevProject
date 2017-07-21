function Loader() {}
let map;
let track;

Loader.prototype.initMap = function (lat, lng) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: lat, lng: lng},
        zoom: 10
    });
};

Loader.prototype.drawTrack = function (coordinatesArray) {
	if (track !== undefined) {
		track.setMap(null);
	}
	let center = new google.maps.LatLng(coordinatesArray[0].lat, coordinatesArray[0].lng);
	map.setCenter(center);
	map.setZoom(10);
    track = new google.maps.Polyline({
		path: coordinatesArray,
		strokeColor: "#ff0000",
		strokeOpacity: "0.8",
		strokeWeight: 2,
	});
    track.setMap(map);
};

module.exports = Loader;