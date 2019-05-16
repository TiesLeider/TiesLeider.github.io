require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GeoJSONLayer",
  ], function(Map, SceneView, GeoJSONLayer) {

  var map = new Map({
    basemap: "streets",
    ground: "world-elevation"
  });

  var geoJSONLayer = new GeoJSONLayer({
    url: "https://map.data.amsterdam.nl/maps/hoofdroutes?service=WFS&request=GetFeature&version=2.0.0&typenames=vrachtroutes&outputformat=geojson&srsname=EPSG:4326",
    copyright: "Vrachtroute Stadsdeel Centrum >7.5 ton",
 });

  map.add(geoJSONLayer);

  var view = new SceneView({
    container: "viewDiv",
    map: map,
  });

  view.when(function() {
    geoJSONLayer.when(function() {
      view.goTo(geoJSONLayer.fullExtent);
    });
  });
});
