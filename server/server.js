// referenzen auf express und routing objekte
const express = require("express");
const routes = require("./api/api");
const http = require("http");

// app instanz
const app = express();

// statische dateien
app.use("/", express.static("client/dist"));

// routing: / als root, get und post anfragen in api klasse definiert
app.use("/data", routes);

// port lesen oder setzen, falls nicht vorhanden
let port = process.argv[2] || 8080;
http.createServer(app).listen(port, () => {
	console.log("Server listening on port " + port);
});