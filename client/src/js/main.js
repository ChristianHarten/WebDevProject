/*
 * Einstiegspunkt der Anwendung
 */
const d3 = require("d3");
const httpclient = require("./modules/http-request-helper");
const elemUtils = require("./modules/element-utils");
const maputils = require("./modules/map-utils");

// enthält JSON Daten der GET Anfrage
let tracksArray;
let client = new httpclient.HttpClient(d3);
let map = new maputils.MapLoader(d3);
let port = window.location.port;

client.get("http://localhost:" + port + "/data/list", handleGetResponse);

// Request Callback, da GET Anfrage asynchron ausgeführt wird
function handleGetResponse(data) {
	tracksArray = data;
	let elementTools = new elemUtils.ElementTools(d3, map, tracksArray);
	elementTools.displayTracks();
}
