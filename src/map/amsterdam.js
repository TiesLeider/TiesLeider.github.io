require([
    "esri/Map",
    "esri/views/SceneView",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/request"

  ], function(Map, SceneView, GeoJSONLayer, Legend, LayerList, esriRequest) {

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
      defaultSymbol: symbology("simple-line", "blue", "1px", "solid"),
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


  var OpAfstapplaatsen = new GeoJSONLayer({
    url: "https://api.data.amsterdam.nl/dcatd/datasets/hr5OD_Xsn6ri8w/purls/2",
    title: "Op & Afstapplaatsen Passagiersvaart"
   });



   var VKLichten = new GeoJSONLayer({
    url: "https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=VERKEERSLICHTEN&THEMA=verkeerslichten",
    title: "Verkeerslichten"
   });


  // var cityLayer = new GeoJSONLayer({
  //   url: "https://maps.amsterdam.nl/open_geodata/geojson.php?KAARTLAAG=GEBIED_STADSDELEN&THEMA=gebiedsindeling",
  //   title: "Stadsdelen",
  //   // renderer: {
  //   //   type: "unique-value",
  //   //   defaultSymbol: symbology("simple-fill", [30, 144, 255, 0.2], "1px", "solid"),
  //   //   defaultLabel: "Stadsdeel"
  //   //  }
  //  });

  var url = "https://maps.amsterdam.nl/_php/haal_objecten.php?TABEL=GEBIED_STADSDELEN&THEMA=gebiedsindeling";

  esriRequest(url, {
    responseType: "json"
  }).then(function(response){
    // The requested data
    var geoJson = response.data;
    console.log(response);
  });

  var map = new Map({
    basemap: "hybrid",
    ground: "world-elevation",
    layers: [vrachtRoutesLayer, milieuzone, OpAfstapplaatsen, VKLichten]
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
