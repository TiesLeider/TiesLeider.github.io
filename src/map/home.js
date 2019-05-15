require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
  ], function(Map, MapView, GeoJSONLayer) {

  var map = new Map({
    basemap: "topo-vector"
  });

  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [4.895168, 52.370216],
    zoom: 12
  });

  var geoJSONLayer = new GeoJSONLayer({
    url: "https://map.data.amsterdam.nl/maps/hoofdroutes?service=WFS&request=GetFeature&version=2.0.0&typenames=vrachtroutes&outputformat=geojson&srsname=EPSG:4326",
    copyright: "Vrachtroute Stadsdeel Centrum >7.5 ton",
    
 });


map.add(geoJSONLayer);

});
