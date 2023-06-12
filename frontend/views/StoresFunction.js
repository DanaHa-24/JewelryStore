function initMap() {
  const storesMap = $('<div>').addClass('map');
  $('body').append(storesMap);
  // Create a map centered at a specific location
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 12
  });

  // Retrieve addresses from your database
  let addresses = ['Address 1', 'Address 2', 'Address 3'];

  // Loop through the addresses
  for (let i = 0; i < addresses.length; i++) {
    // Geocode the address to get latitude and longitude
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({address: addresses[i]}, function(results, status) {
      if (status === 'OK') {
        // Create a marker for each location
        new google.maps.Marker({
          position: results[0].geometry.location,
          map: map
        });
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
}

initMap();