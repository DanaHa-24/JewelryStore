function initMap() {
  const infoContainer = $('<div>').addClass('stores-info-container');
    const contentContainer = $('<div>').addClass('content-stores-map');
    const headerContainer = $('<h3>').text('חנויות שלנו').addClass('stores-page-header');
    $('body').append(headerContainer).append(infoContainer);


  // Specify the coordinates for each branch
  const branches = [
    { name: 'הסטודיו שלנו', lat: 31.960634, lng: 34.789192 },
    { name: 'ייצור', lat: 31.949102, lng: 34.830605 },
    { name: 'הפצה', lat: 37.789, lng: -122.123 }
    // Add more branches as needed
  ];

  const map = new google.maps.Map(contentContainer, {
    center: { lat: 37.123, lng: -122.456 },
    zoom: 10
  });

  // Add markers for each branch
  branches.forEach(branch => {
    new google.maps.Marker({
      position: { lat: branch.lat, lng: branch.lng },
      map: map,
      title: branch.name
    });
  });
}

initMap();