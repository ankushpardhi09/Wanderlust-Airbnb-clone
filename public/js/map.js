console.log('Map script loaded');
console.log('listingCoordinates:', listingCoordinates);

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

console.log('Map initialized');

if (typeof listingCoordinates !== 'undefined' && listingCoordinates) {
    console.log('Using listing coordinates');
    const [lng, lat] = listingCoordinates;
    L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 13);
} else {
    console.log('Using geolocation');
    navigator.geolocation.watchPosition(success, error);

    let marker, circle, zoomed;

    function success(pos) {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        if (marker) {
            map.removeLayer(marker);
            map.removeLayer(circle);
        }

        marker = L.marker([lat, lng]).addTo(map);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

        if (!zoomed) {
            zoomed = map.fitBounds(circle.getBounds());
        }
    }

    function error(err) {
        if (err.code === 1) {
            alert("Please allow your location access");
        } else {
            alert("Cannot get your current location");
        }
    }
}

// const map = new mapboxgl.Map({
//   container: "map", // container ID
//   style: "mapbox://styles/mapbox/streets-v12", // style URL
//   center: listing.geometry.coordinates, // starting position [lng, lat]
//   zoom: 9, // starting zoom
// });

// const marker = new mapboxgl.Marker({ color: "red" })
//   .setLngLat(listing.geometry.coordinates) // listing.geometry.coordinates;
//   .setPopup(
//     new mapboxgl.Popup({ offset: 25 }).setHTML(
//       `<h4>${listing.title}</h4><p>Exact Location will be Provided after booking</p>`
//     )
//   )
//   .addTo(map)
   