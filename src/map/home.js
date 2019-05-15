require([
    "esri/Map",
    "esri/views/MapView"
  ], function(Map, MapView) {

  var map = new Map({
    basemap: "topo-vector"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [4.895168, 52.370216],
    zoom: 12
  });
});
