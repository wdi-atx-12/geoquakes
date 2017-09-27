// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  getMapData();
});


function getMapData() {

  $.ajax( {
    method: 'GET',
    url: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',

    //data: '',
    dataType: 'json',
    success: onSuccess,
    error: onError
  })
}
// <div id="info">
//   <p>M 4.2 - 1km ESE of Fontana, California / 123 hours ago </p>
//   <p>M 3.1 - 6km SSW of Columbus, Ohio / 77 hours ago </p>
// </div>
function onSuccess(jsonReturn) {
  console.log(jsonReturn.features);

  for (var i = 0; i < jsonReturn.features.length; i++) {
    let data = jsonReturn.features[i].properties;
    let magnitude = data.mag;
    let place = data.place;
    let time = data.time;
    let now = Date.now();
    let timeDifference =  Math.floor((((now - time) / 1000) /60) /60);
    console.log(magnitude);



    let earthquake = '<p>M ' + magnitude + ', ' + place + ' / ' + timeDifference + ' hours ago </p>';
    $('#info').append(earthquake);


  }






}

function onError() {
  console.log('failure');
}
