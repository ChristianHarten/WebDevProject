//main file for client app
//loads modules and invokes methods to do work
const httpclient = require("./modules/http-request-helper");
const elemUtils = require("./modules/element-utils");
const port = window.location.port;
const apiGetRequestURL = "http://192.168.178.35:" + port + "/data/list";

// client: HttpClient instance
let client = new httpclient.HttpClient();
// utils: element utils instance. holds functions to load map, display tracks etc
let utils;
// tracksArray: stores server response
let tracksArray;
// htmlhelper: HtmlHelper instance, stores html id´s
let htmlhelper = new elemUtils.HTMLHelper()
	.sidebarID("sidebar")
	.pageNavigationContainerID("pageNavContainer")
	.trackElementID("navigationElement")
	.sidebarItemContainerID("sidebar-items")
	.nextButtonID("forwardButton")
	.prevButtonID("backButton")
	.navigationButtonClass("pageNav")
	.currentPageID("currentPage")
	.allPagesID("allPages")
	.elevationChartID("elevationChart");

// get request, loads default map part (first entry in tracks)
client.get(apiGetRequestURL, function (response) {
	tracksArray = JSON.parse(response);
	utils = new elemUtils.Calculator(tracksArray, htmlhelper);
	utils.setZoomFactor(11);
	utils.loadMapPart(52.370216, 4.895168);
	utils.calculateElements();
	utils.addPageNavListeners();
});
