// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 3
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
    var lat = data.features[i].geometry.coordinates[0];
    var long = data.features[i].geometry.coordinates[1];
    var depth = data.features[i].geometry.coordinates[2]


  //   L.circle(countries[i].location, {
  //     fillOpacity: 0.75,
  //     color: "white",
  //     fillColor: color,
  //   // Adjust radius
  //   radius: countries[i].points * 1500
  // }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
}
});
