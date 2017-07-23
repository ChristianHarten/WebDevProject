// express and routing objects
const express = require("express");
const routes = require("./api/api");
const http = require("http");

// app: express instance
const app = express();

// deploy static files
app.use("/", express.static("client/dist"));

// routing: / als root, get und post anfragen in api klasse definiert
// routing: "/data" as root
app.use("/data", routes);

// read port, if available, set to 8080 otherwise
let port = process.argv[2] || 8080;
http.createServer(app).listen(port, () => {
	console.log("Server listening on port " + port);
});