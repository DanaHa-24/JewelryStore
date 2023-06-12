const infoContainer = $('<div>').addClass('stores-info-container');
const contentContainer = $('<div>').addClass('content-stores-map');
const headerContainer = $('<h3>').text('החנויות שלנו').addClass('stores-page-header');
$('body').append(headerContainer).append(infoContainer);
const storesMap = $('<div>').addClass('map').attr("id","map");
$('body').append(storesMap);
  
const apiKey = 'pk.eyJ1IjoiZGFuYTE1NCIsImEiOiJjbGlzdDd0c2wwNGNlM2xqcmtpdWZwaWxzIn0.UF_fsHnkjhdbiymKtgBcmg';
const mymap = L.map('map').setView([31.954870, 34.810266], 14);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey
}).addTo(mymap);

// Adding Marker

const marker = L.marker([31.960921, 34.789294]).addTo(mymap);

// Add popup message
let template = `

<h6>הסטודיו שלנו</h6>
<div style="text-align:center">
    <img width="150" height="150"src="../images/BU.jpeg"/>
</div>
`
marker.bindPopup(template);

