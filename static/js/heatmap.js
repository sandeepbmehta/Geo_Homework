var myMap = L.map("map", {
  center: [48.3544, -99.9981],
  zoom: 3
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 10,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url, function(response) {

  // console.log(response);
  var features = response.features;
  // console.log(features);
  var heatArray = [];

  for (var i = 0; i < features.length; i++) {
    var location = features[i].geometry;

    if (location) {
      L.circleMarker(([location.coordinates[1], location.coordinates[0]]),
      {
        radius: (features[i].properties.mag * 3),
        // color: markerColor(features[i].properties.mag),
        color: "white",
        fillColor: markerColor(features[i].properties.mag),
        weight: 0.2
      })
      .bindPopup("<h3> Magnitude: " + features[i].properties.mag + "<br> Place: " + features[i].properties.place + "<br> </h3>")
      .addTo(myMap);
      
    }
  }
});

function markerColor(magnitude) {
  if (magnitude < 1){
    return "green";
  }
  else 
    if (magnitude < 2) {
      return "yellow";
    }
    else  
      if (magnitude < 3) {
        return "orange";
      }
      else
        if (magnitude < 4) {
          return "dark orange";
        }
        else  
          if (magnitude < 5) {
            return "pink"
          }
          else {
            return "red";
          }
};
