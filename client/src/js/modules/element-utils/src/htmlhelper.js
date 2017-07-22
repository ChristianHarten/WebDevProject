let HTMLHelper = function () {
	let sidebarID,
		pageNavigationContainerID,
		trackElementID,
		sidebarItemContainerID,
		nextButtonID,
		prevButtonID,
		navigationButtonClass;
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
};

module.exports = HTMLHelper;
