// script.js

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v11',
center: [20, 10],
zoom: 1.4,
projection: 'mercator'
});

map.addControl(new mapboxgl.NavigationControl());

const locations = [
{
name: 'Kenya',
coordinates: [37.9062, -0.0236]
},
{
name: 'Ethiopia',
coordinates: [40.4897, 9.145]
},
{
name: 'Brazil',
coordinates: [-51.9253, -14.235]
},
{
name: 'Colombia',
coordinates: [-74.2973, 4.5709]
}
];

locations.forEach(location => {

const marker = document.createElement('div');

marker.style.width = '14px';
marker.style.height = '14px';
marker.style.borderRadius = '50%';
marker.style.background = '#9e2a2b';
marker.style.boxShadow = '0 0 18px #9e2a2b';

new mapboxgl.Marker(marker)
.setLngLat(location.coordinates)
.setPopup(
new mapboxgl.Popup().setHTML(
`<h3>${location.name}</h3>`
)
)
.addTo(map);

});