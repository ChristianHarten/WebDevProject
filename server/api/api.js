const express = require("express");
const fs = require("fs");
const path = require("path");

const dataDirectory = path.join(__dirname, "..", "data");
const router = express.Router();

/*
 * Sendet alle verfügbaren GeoJSON Files an Client
 */
router.get("/list", function (req, res) {
	let tracksCount = countTracks();
	let tracks = [];
	for (let i = 1; i < tracksCount; i++) {
		tracks.push(require("../data/" + i + ".json"));
	}
	res.send(tracks);
});

/*
 * Zählt vorhandene GeoJSON File unter bestimmtem Pfad (dataDirectory)
 */
function countTracks () {
	try {
		return fs.readdirSync(dataDirectory).length;
	}
	catch (err) {
		console.log(err);
		return 0;
	}
}

module.exports = router;