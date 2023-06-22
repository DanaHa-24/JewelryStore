
const headerContainer = $('<h1>').text('החנויות שלנו').addClass('stores-page-header');
const mapContainer = $('<div>').attr("id","stores-page-container");
const mapElement = $('<div>').attr("id","stores-page-map");
const storesLocation = $('<aside>').addClass("stores-page-location-aside");

let locations = [];

$('body').append(headerContainer);
$('body').append(mapContainer);
$('#stores-page-container').append(mapElement);
$('#stores-page-container').append(storesLocation);

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
});

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

// Storing the reference to the currently open info window
let currentInfoWindow = null;

function initMap(apiKey, locations) {
  let mapOptions = {
    center: new google.maps.LatLng(31.954870, 34.810266),
    zoom: 12
  };
  let map = new google.maps.Map(document.getElementById('stores-page-map'), mapOptions);
  
  // Create markers for each location
  if (locations) {
    locations.forEach((location) => {
      const infowindow = new google.maps.InfoWindow({
        content: `<div>${location.name}</div>`,
        ariaLabel: location.name
      });
      
      const icon = {
        url: "/images/BU-marker2.png", 
        scaledSize: new google.maps.Size(60, 40),
        labelOrigin: new google.maps.Point(20, 50)
      };

      const marker = new google.maps.Marker({
        position: { lat: location.latitude, lng: location.longitude },
        map: map,
        title: location.name,
        icon: icon
      });

      marker.addListener("click", () => {
        // Close the previously open info window, if any
        if (currentInfoWindow) {
          currentInfoWindow.close();
        }

        // Open the clicked marker's info window
        infowindow.open(map, marker);
        
        // Update the reference to the currently open info window
        currentInfoWindow = infowindow;
      });

      let locationsDiv = $('<div>').addClass("stores-page-location-info");
      let locationName = $('<div>').addClass("stores-page-location-name").text(location.name).css("font-weight", "bold");
      let citySpan = $('<span>').addClass("stores-page-city-location").text(location.city);
      let streetSpan = $('<span>').addClass("stores-page-street-location").text(location.street);

      locationsDiv.append(locationName, citySpan, streetSpan);
      $(".stores-page-location-aside").append(locationsDiv);

    });
  } else {
    console.log("No locations found");
  }
}

