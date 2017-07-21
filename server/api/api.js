const express = require("express");
const router = express.Router();

router.get("/list", function (req, res) {
	let tracks = [];
	for (let i = 1; i < 66; i++) {
		tracks.push(require("../data/" + i + ".json"));
	}
	res.send(tracks);
});

module.exports = router;