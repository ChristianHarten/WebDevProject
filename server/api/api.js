const express = require("express");
const router = express.Router();

router.get("/list", function (req, res) {
	res.send(require("../data/1.json"));
});

module.exports = router;