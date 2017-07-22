const express = require("express");
const fs = require("fs");
const path = require("path");

const dataDirectory = path.join(__dirname, "..", "data");
const router = express.Router();

/**
 * Sends all available tracks as a string to client
 */
router.get("/list", function (req, res) {
	let tracksCount = countTracks();
	let tracks = [];
	for (let i = 1; i < tracksCount; i++) {
		tracks.push(require("../data/" + i + ".json"));
	}
	res.send(tracks);
});

/**
 *
 * @returns {number} Number of tracks stored on data directory
 * 0 if error happens
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