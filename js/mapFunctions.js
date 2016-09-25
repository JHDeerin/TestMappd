var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0.0, lng: 0.0},
    zoom: 3
  });
}

$("#inputButton").click(function(){
  var webAddress = "www.microsoft.com"; //placeholder
  var ip = $("#userInput").val();
  console.log(ip);

      $.ajax({
        url: "http://pro.viewdns.info/traceroute/?domain=" + webAddress + "&apikey=37ff79af33301ae2b842a2698b1bc98105129426&output=json",
        dataType: "json",
        function(server) {
            console.log(server[1].ip);
        }
    });

  var location = $.getJSON("http://ip-api.com/json/" + ip + "?callback=?", function(json){
      console.log(json);
      var markerLatLng = {lat: json.lat, lng: json.lon};
      //image =
      map.panTo(markerLatLng);
      map.setZoom(8);
      console.log(markerLatLng);

      var infoString;
      var cityWeather = $.getJSON("http://api.openweathermap.org/data/2.5/weather?q="+json.city+"&APPID=3c0dec929f348a0dd2c4ee3de2b8ba27", function(weather){
          console.log(weather);
          console.log("Temp ", weather.main.temp, " C");
          console.log(weather.weather[0].description);

          infoString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">'+ json.city +'</h1>'+
              '<div id="bodyContent">'+
              '<p><b>(Current Weather:'+ weather.weather[0].description + ", "+ (weather.main.temp - 273) +'C )</b>' +
              '</div>'+
              '</div>';

          var infowindow = new google.maps.InfoWindow({
             content: infoString
          });

          var marker = new google.maps.Marker({
              position: markerLatLng,
              map: map,
              title: json.city
          });
          marker.addListener('click', function() {
              infowindow.open(map, marker);
          });
      });
  })
})
