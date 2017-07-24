/**
 * Helper class to load, draw and recenter map
 * @constructor
 */
let Loader = function () {
	let map,
		center,
		track,
		elevator;
	this.initMap = function (lat, lng, zoom) {
		map = new google.maps.Map(document.getElementById("map"), {
			center: {lat: lat, lng: lng},
			zoom: zoom,
			disableDefaultUI: true
		});
		center = map.getCenter();
	};
	this.drawTrack = function (coordinatesArray, zoom) {
		if (track !== undefined) {
			track.setMap(null);
		}
		center = new google.maps.LatLng(coordinatesArray[0].lat, coordinatesArray[0].lng);
		map.setCenter(center);
		map.setZoom(zoom);
		track = new google.maps.Polyline({
			path: coordinatesArray,
			strokeColor: "#ff0000",
			strokeOpacity: "0.8",
			strokeWeight: 2,
		});
		track.setMap(map);
		elevator = new google.maps.ElevationService;
		elevator.getElevationAlongPath({
			"path": coordinatesArray,
			"samples": 500
		}, function (elevations, status) {
			let chartDiv = document.getElementById("elevationChart");
			if (status !== "OK") {
				chartDiv.innerHTML = "";
				alert("Konnte Höhenprofil zur Strecke nicht laden. Fehler " + status);
				return;
			}
			let chart = new google.visualization.ColumnChart(chartDiv);
			let data = new google.visualization.DataTable();
			data.addColumn("string", "Sample");
			data.addColumn("number", "Elevation");
			for (let i = 0; i < elevations.length; i++) {
				data.addRow(["", elevations[i].elevation]);
			}
			chart.draw(data, {
				height: 125,
				width: 250,
				legend: "none",
				titleY: "Höhenprofil in Meter"
			});
		});
	};
	this.recenter = function () {
		map.setCenter(center);
	};
};

module.exports = Loader;