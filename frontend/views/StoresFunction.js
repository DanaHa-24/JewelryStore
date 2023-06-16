const headerContainer = $('<h3>').text('החנויות שלנו').addClass('stores-page-header');
const mapContainer = $('<div>').attr("id","map-container");
const mapElement = $('<div>').attr("id","mapElement-stores");
let locations = []; // Initialize locations as an empty array
$('body').append(headerContainer);
$('body').append(mapContainer);
$('#map-container').append(mapElement);

$(document).ready(function() {
  // Make an AJAX request to retrieve the API key from the backend
  $.ajax({
    url: 'http://localhost:5000/api/config/api-key',
    method: 'GET',
    success: function(response) {
      const apiKey = response.apiKey;
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
    fetchStoreBranches(apiKey);
  };

  // Append the script to the document body
  document.body.appendChild(script);
}

function fetchStoreBranches(apiKey) {
  // Make an AJAX request to retrieve the store branch data from the backend
  $.ajax({
    url: 'http://localhost:5000/api/storeBranches',
    method: 'GET',
    success: function(response) {
      locations = response;

      // Call initMap with the API key and store branch locations
      initMap(apiKey, locations);
    },
    error: function(error) {
      console.error('Error retrieving store branches:', error);
    }
  });
}

function initMap(apiKey, locations) {
  let mapOptions = {
    center: new google.maps.LatLng(31.954870, 34.810266),
    zoom: 12
  };
  let map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // Create markers for each location
  if (locations) {
    locations.forEach((location) => {
      const infowindow = new google.maps.InfoWindow({
        content: `<div>${location.name}</div>`,
        ariaLabel: location.name
      });
      const marker = new google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: map,
        title: location.name
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });

    });
  }
  else{
    console.log("No locations found");
  }
}
