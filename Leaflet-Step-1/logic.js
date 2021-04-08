// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 2
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  for(var i=0; i<data.features.length; i++){
    var mag = data.features[i].properties.mag;
    var depth = data.features[i].geometry.coordinates[2]
    var coordinates = [data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]

    if(depth <= 10){
      color = "#17ff0a"

    } else if(depth >10 && depth <= 30){
      color= "#5cb60a"
    } else if(depth >30 && depth <= 50){
      color= "#f4bd09"
    }else if(depth >50 && depth <= 70){
      color= "#f46f0c"
    }else if(depth >70 && depth <= 90){
      color= "#ff4702"
    }
    else{
      color="#f90909"
    }

    L.circle(coordinates, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
    // Adjust radius
    radius: mag * 15000
  }).bindPopup("<h1>Magnitude: " + mag + "</h1><hr> <h3>Depth: " + depth + "</h3>").addTo(myMap);
}
});
