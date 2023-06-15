let map;
let center = [];

function initMap() {
    $.get('/showGel',(data,status)=>{
    for (let i=0; i<data.length; i++){
        const item = {
            lat: data[i].latitude,
            lng: data[i].longitude
        }
        center.push(item);
    }
    console.log(center);
    let maps = [];
    let markers = [];
    let infoWindows = [];
    map = new google.maps.Map(document.getElementById("map1"), {
            center : center[0],
            zoom: 10,
    });
    for(let i =0; i < center.length; i++){
        let number = i;
        let newNumber = i+1;
        const labelStr = newNumber.toString();
        const marker = new google.maps.Marker({
            position: center[i],
            map:map,
            label: labelStr,
            draggable: false,
            animation: google.maps.Animation.DROP
        });
        let infoWindow = new google.maps.InfoWindow({
            content: "<p><b>" + data[i].address + "</b></p>"
        })
        infoWindow.open(map,marker);
    });
}
window.initMap = initMap;