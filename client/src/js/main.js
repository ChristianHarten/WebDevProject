const httpclient = require("./modules/http-request-helper");
const maputils = require("./modules/map-utils");
const elemUtils = require("./modules/element-utils");

let tracksArray;
let client = new httpclient.HttpClient();
let mapLoader = new maputils.MapLoader();

mapLoader.setMapView(52.370216, 4.895168);
client.get("http://localhost:8080/data/list", handleGetResponse);

function handleGetResponse(data) {
	tracksArray = data;
	let elementTools = new elemUtils.ElementTools(tracksArray, mapLoader);
	elementTools.displayTracks();
}
