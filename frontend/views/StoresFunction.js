const headerContainer = $('<h3>').text('החנויות שלנו').addClass('stores-page-header');
const mapContainer = $('<div>').attr("id","map-container");
const mapElement = $('<div>').attr("id","map");

$('body').append(headerContainer);
$('body').append(mapContainer);
$('#map-container').append(mapElement);

function initMap() {
  let mapOptions = {
    center: new google.maps.LatLng('31.954870', '34.810266'),
    zoom: 12
  };
  let map = new google.maps.Map(document.getElementById('map'), mapOptions);
}


$(document).ready(function() {
  // Make an AJAX request to retrieve the API key from the backend
  $.ajax({
    url: 'http://localhost:5000/api/config/api-key',
    method: 'GET',
    success: function(response) {
      console.log('API key response:', response);
      const apiKey = response.apiKey;
      console.log(typeof initMap)
      loadGoogleMapsScript(apiKey);
    },
    error: function(error) {
      console.error('Error retrieving API key:', error);
    }
  });
});

function loadGoogleMapsScript(apiKey) {
  // Construct the script element with the API key
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
  script.defer = true;
  script.async = true;
  
  script.onload = function() {
    initMap();
  };

  // Append the script to the document body
  document.body.appendChild(script);
}