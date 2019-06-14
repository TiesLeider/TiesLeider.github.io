require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol"

  ], function(Map, MapView, GeoJSONLayer, Legend, LayerList, SimpleMarkerSymbol, SimpleFillSymbol, SimpleLineSymbol) {

  const RefreshEveryThirtySeconds = 0.5;
  const NoRefresh = 0;

  const BaseMap = new Map({
    basemap: "topo-vector",
  });

  const Symbology = function (type, color, width, style, op) {
    const symbology = {
      type: type,
      color: color,
      width: width,
      style: style,
    };
    return symbology;
  };

  const VrachtRoutesLayer = new GeoJSONLayer({
    url: "https://map.data.amsterdam.nl/maps/hoofdroutes?service=WFS&request=GetFeature&version=2.0.0&typenames=vrachtroutes&outputformat=geojson&srsname=EPSG:4326",
    title: "Vrachtroutes",
    renderer: {
      type: "unique-value",
      defaultSymbol: Symbology("simple-line", "blue", "1px", "solid"),
      defaultLabel: "Vrachtroute Stadsdeel Centrum >7.5 ton"
    }
 });

  BaseMap.layers.add(VrachtRoutesLayer);


 const Milieuzone = new GeoJSONLayer({
   url: "https://map.data.amsterdam.nl/maps/milieuzones?service=WFS&request=GetFeature&version=2.0.0&typenames=milieuzones&outputformat=geojson&srsname=epsg:4326",
   title: "Milieuzone",
   renderer: {
     type: "unique-value",
     defaultSymbol: Symbology("simple-fill", [100, 255, 13, 0.3], "1px", "solid"),
     defaultLabel: "Milieuzone"
    }
  });

  BaseMap.layers.add(Milieuzone);

  // var Parkeervakken = new GeoJSONLayer({
  //   url: "https://api.data.amsterdam.nl/parkeervakken/parkeervakken/",
  //   title: "parkeervakken",
  //   renderer: {
  //     type: "unique-value",
  //     defaultSymbol: symbology("simple-fill", [255, 125, 13, 0.2], "1px", "solid"),
  //     defaultLabel: "parkeervak"
  //    }
  //  });

   const OpAfstapplaatsen = new GeoJSONLayer({
     url: "https://api.data.amsterdam.nl/dcatd/datasets/hr5OD_Xsn6ri8w/purls/2",
     title: "Op & Afstapplaatsen Passagiersvaart",
     renderer: {
       type: "unique-value",
       defaultSymbol: Symbology("simple-marker", [255, 50, 13, 0.7], "1px", "circle"),
       defaultLabel: "Op & Afstapplaatsen Passagiersvaart"
      }
    });

    OpAfstapplaatsen.minScale = 50000;
    BaseMap.layers.add(OpAfstapplaatsen);

    // var VKLichten = new GeoJSONLayer({
    //  url: "https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=VERKEERSLICHTEN&THEMA=verkeerslichten",
    //  title: "Verkeerslichten"
    // });

  const View = new MapView({
      container: "viewDiv",
      map: BaseMap,
      center: [4.895168, 52.370216],
      zoom: 12
    });




  const legend = new LayerList({
  view: View,
  style: "card",
  listItemCreatedFunction: function(event) {
    const Item = event.item;
    if (Item.layer.type != "group") {
      // don't show legend twice
      Item.panel = {
        content: "legend",
        open: false,
      };
    }
  }
});

  View.ui.add(legend, "bottom-left");
  View.showZoomSlider = true;

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
