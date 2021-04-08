// Create a map object
var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    // set to a small zoom because this is the quakes all around the earth
    zoom: 2
  });
  // create the tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

// pull from the json data that we want
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {
  // loop through all of the specific quakes and grab each piece of data that we need
  for(var i=0; i<data.features.length; i++){
    var mag = data.features[i].properties.mag;
    var depth = data.features[i].geometry.coordinates[2]
    var coordinates = [data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]

    // create a function that takes the depth and chooses a color based off the range
    function getColor(depth){
    if(depth <= 10){
      return "#17ff0a"

    } else if(depth >10 && depth <= 30){
      return "#5cb60a"
    } else if(depth >30 && depth <= 50){
      return "#f4bd09"
    }else if(depth >50 && depth <= 70){
      return "#f46f0c"
    }else if(depth >70 && depth <= 90){
      return "#ff4702"
    }
    else{
      return "#f90909"
    }
  }

  // draw the circles while using magnitude and depth to make them unique
    L.circle(coordinates, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: getColor(depth),
    radius: mag * 15000

    // make a popup that tells you the specifics of what the actual magnitude and depth are
  }).bindPopup("<h1>Magnitude: " + mag + "</h1><hr> <h3>Depth: " + depth + "</h3>").addTo(myMap);
}
//  from https://leafletjs.com/examples/choropleth/
// create a legend that will sit in the bottom right
var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend');
    // all of the ranges that the quake could be in
    categories = ['-10','10','30','50','70', '90'];
    // all of the different colors that the circle could be 
    var colors = [
      "#17ff0a",
      "#5cb60a",
      "#f4bd09",
      "#f46f0c",
      "#ff4702",
      "#f90909"
    ];
// loop through the categories and add to the div that we created
    for (var i = 0; i < categories.length; i++) {
       div.innerHTML += 
      //  on each label add the color that corresponds
       '<i style="background:' + colors[i] + '"></i> ' +
      //  add the two numbers with a dash in between
       categories[i] + (categories[i + 1] ? '&ndash;' + categories[i + 1] + '<br>' : '+');
      }
      // return the div that we created
      return div;
    };
    // add the legend to the map
    legend.addTo(myMap);
  });



