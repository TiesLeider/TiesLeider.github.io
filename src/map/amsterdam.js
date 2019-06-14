require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Legend",
    "esri/widgets/LayerList"

  ], function(Map, SceneView, GeoJSONLayer, Legend, LayerList) {

  // symbology
  var symbology = function (type, color, width, style, op) {
    const symbology = {
      type: type, // autocasts as new SimpleLineSymbol()
      color: color,
      width: width,
      style: style,
    };
    return symbology;
  };

  var vrachtRoutesLayer = new GeoJSONLayer({
    url: "https://map.data.amsterdam.nl/maps/hoofdroutes?service=WFS&request=GetFeature&version=2.0.0&typenames=vrachtroutes&outputformat=geojson&srsname=EPSG:4326",
    title: "Vrachtroutes",
    renderer: {
      type: "unique-value",
      defaultSymbol: symbology("simple-line", "red", "1px", "solid"),
      defaultLabel: "Vrachtroute Stadsdeel Centrum >7.5 ton"
    }
 });

 var milieuzone = new GeoJSONLayer({
   url: "https://map.data.amsterdam.nl/maps/milieuzones?service=WFS&request=GetFeature&version=2.0.0&typenames=milieuzones&outputformat=geojson&srsname=epsg:4326",
   title: "Milieuzone",
   renderer: {
     type: "unique-value",
     defaultSymbol: symbology("simple-fill", [125, 255, 13, 0.2], "1px", "solid"),
     defaultLabel: "Milieuzone"
    }
  });

  var parkeervlakken = new GeoJSONLayer({
    url: "https://api.data.amsterdam.nl/parkeervakken/parkeervakken/",
    title: "parkeervlakken",
    renderer: {
      type: "unique-value",
      defaultSymbol: symbology("simple-fill", [255, 125, 13, 0.2], "1px", "solid"),
      defaultLabel: "parkeervlak"
     }
   });


  // var test = "https://maps.amsterdam.nl/_php/haal_objecten.php?TABEL=GEBIED_STADSDELEN&THEMA=gebiedsindeling";
  // var url = Terraformer.ArcGIS.convert({
  //   "type": "Point",
  //   "coordinates": [45.5165, -122.6764]
  // });
  //
  // esriRequest(url, {
  //   responseType: "json"
  // }).then(function(response){
  //   // The requested data
  //   var geoJson = response.data;
  //   console.log(response);
  // });


  // var vlak = Terraformer.ArcGIS.convert({
  //   type: "Polygon"
  //   coordinates
  // });

  var map = new Map({
    basemap: "hybrid",
    ground: "world-elevation",
    layers: [vrachtRoutesLayer, milieuzone, parkeervakken]
  });

  var view = new SceneView({
    container: "viewDiv",
    map: map
  });

  const legend = new LayerList({
  view: view,
  style: "card",
  listItemCreatedFunction: function(event) {
    const item = event.item;
    if (item.layer.type != "group") {
      // don't show legend twice
      item.panel = {
        content: "legend",
        open: false,
      };
    }
  }
});

  view.ui.add(legend, "bottom-left");
  view.when(function() {
    milieuzone.when(function() {
      view.goTo(milieuzone.fullExtent);
    });
  });
});
