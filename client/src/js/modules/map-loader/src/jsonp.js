/**
 * Helper module to add google maps api script to website
 * @param url API URL
 * @param callbackname API callback
 * @param done Done
 */
module.exports = function (url, callbackname, done) {
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	let s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(script, s);

	window[callbackname] = done;
};
