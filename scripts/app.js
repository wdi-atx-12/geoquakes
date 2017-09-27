// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");

  getMapData();
});


function getMapData() {
  $.ajax( {
    method: 'GET',
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
    dataType: 'json',
    success: onSuccess,
    error: onError
  })
}

function onSuccess(jsonReturn) {
  //console.log(jsonReturn.features);

  let coords = [];

  for (var i=0; i<jsonReturn.features.length; i++) {

    let data = jsonReturn.features[i].properties;
    let latitude = jsonReturn.features[i].geometry.coordinates[0];
    let longitude = jsonReturn.features[i].geometry.coordinates[1];
    console.log(latitude + "   " + longitude);
    coords.push({
      lat: latitude,
      lng: longitude
    });
    let magnitude = data.mag;
    let place = data.place;
    let time = data.time;
    let now = Date.now();
    let timeDifference =  Math.floor((((now - time) / 1000) /60) /60);
    let earthquake = '<p>M ' + magnitude + ', ' + place + ' / ' + timeDifference + ' hours ago </p>';
    $('#info').append(earthquake);
  }
  //console.log(coords);
 buildMap(coords);
}

function onError() {
  console.log('failure');
}

function buildMap(coords){


  //make a map
  var map = new google.maps.Map(document.getElementById('map'), {
   center: {lat: 30.2682, lng: -97.74295},
   zoom: 3
  });

  //set all marks from coords
  for(i=0;i<coords.length;i++){

    var marker = new google.maps.Marker({
            position: coords[i],
            map: map
            icon: 'images/earthquake.png'
  });

  }

}
