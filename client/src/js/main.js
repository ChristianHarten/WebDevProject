/*
 * Einstiegspunkt der Anwendung
 */
const httpclient = require("./modules/http-request-helper");
const elemUtils = require("./modules/element-utils");

// enthält JSON Daten der GET Anfrage
let tracksArray;
let client = new httpclient.HttpClient();

client.get("http://localhost:8080/data/list", handleGetResponse);

// Request Callback, da GET Anfrage asynchron ausgeführt wird
function handleGetResponse(data) {
	tracksArray = data;
	let elementTools = new elemUtils.ElementTools(tracksArray);
	elementTools.displayTracks();
}
