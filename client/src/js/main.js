//main file for client app
//loads modules and invokes methods to do work
const httpclient = require("./modules/http-request-helper");
const elemUtils = require("./modules/element-utils");
const apiGetRequestURL = "http://localhost:8080/data/list";

let client = new httpclient.HttpClient();
let utils;
let tracksArray;
let zoomFactor = 11;
let htmlhelper = new elemUtils.HTMLHelper()
	.sidebarID("sidebar")
	.pageNavigationContainerID("pageNavContainer")
	.trackElementID("navigationElement")
	.sidebarItemContainerID("sidebar-items")
	.nextButtonID("forwardButton")
	.prevButtonID("backButton")
	.navigationButtonClass("pageNav")
	.currentPageID("currentPage")
	.allPagesID("allPages");

// get request, loads default map part (first entry in tracks)
client.get(apiGetRequestURL, function (response) {
	tracksArray = JSON.parse(response);
	utils = new elemUtils.Calculator(tracksArray, htmlhelper);
	utils.setZoomFactor(zoomFactor);
	utils.loadMapPart(52.370216, 4.895168);
	utils.calculateElements();
	utils.addPageNavListeners();
});
