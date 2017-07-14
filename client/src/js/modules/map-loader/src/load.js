function Loader() {}

Loader.prototype.initMap = function (lat, lng) {
    let map;
    map = new google.maps.Map(document.getElementById("map"), {
        center: {lat: lat, lng: lng},
        zoom: 10
    });
};

module.exports = Loader;