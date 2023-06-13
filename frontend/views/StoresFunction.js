const headerContainer = $('<h3>').text('החנויות שלנו').addClass('stores-page-header');
const mapContainer = $('<div>').attr("id","map-container");
const mapElement = $('<div>').attr("id","map");

$('body').append(headerContainer);
$('body').append(mapContainer);
$('#map-container').append(mapElement);



function loadGoogleMapsScript() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAFPjN915UN-TjyyPKtfMiELLNhZYrhm7U&callback=initMap`;
  script.defer = true;
  document.body.appendChild(script);
}

function initMap() {
  let mapOptions = {
    center: new google.maps.LatLng('31.954870', '34.810266'),
    zoom: 12
  };
  let map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

$(document).ready(function() {
  loadGoogleMapsScript();
});
