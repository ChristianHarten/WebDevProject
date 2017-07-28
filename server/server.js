// express und routing objekte
const express = require("express");
const routes = require("./api/api");
const http = require("http");

// app: express instanz
const app = express();

// deploy static files
app.use("/", express.static("client/dist"));

// routing: "/data" als root
app.use("/data", routes);


// lese port, wenn angegeben, 8080 sonst
let port = process.argv[2] || 8080;
http.createServer(app).listen(port, () => {
	console.log("Server listening on port " + port);
});