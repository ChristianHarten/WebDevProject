/**
 * Helper class for easier html access, contains getter and setter
 * @constructor
 */
let HTMLHelper = function () {
	let sidebarID,
		pageNavigationContainerID,
		trackElementID,
		sidebarItemContainerID,
		nextButtonID,
		prevButtonID,
		navigationButtonClass,
		currentPageID,
		allPagesID,
		elevationChartID;
	this.sidebarID = function (id) {
		if (!arguments.length) {
			return sidebarID;
		}
		sidebarID = id;
		return this;
	};
	this.pageNavigationContainerID = function (id) {
		if (!arguments.length) {
			return pageNavigationContainerID;
		}
		pageNavigationContainerID = id;
		return this;
	};
	this.trackElementID = function (id) {
		if (!arguments.length) {
			return trackElementID;
		}
		trackElementID = id;
		return this;
	};
	this.sidebarItemContainerID = function (id) {
		if (!arguments.length) {
			return sidebarItemContainerID;
		}
		sidebarItemContainerID = id;
		return this;
	};
	this.nextButtonID = function (id) {
		if (!arguments.length) {
			return nextButtonID;
		}
		nextButtonID = id;
		return this;
	};
	this.prevButtonID = function (id) {
		if (!arguments.length) {
			return prevButtonID;
		}
		prevButtonID = id;
		return this;
	};
	this.navigationButtonClass = function (className) {
		if (!arguments.length) {
			return navigationButtonClass;
		}
		navigationButtonClass = className;
		return this;
	};
	this.currentPageID = function (id) {
		if (!arguments.length) {
			return currentPageID;
		}
		currentPageID = id;
		return this;
	};
	this.allPagesID = function (id) {
		if (!arguments.length) {
			return allPagesID;
		}
		allPagesID = id;
		return this;
	};
	this.elevationChartID = function (id) {
		if (!arguments.length) {
			return elevationChartID;
		}
		elevationChartID = id;
		return this;
	};
};

module.exports = HTMLHelper;
