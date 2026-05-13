const map = L.map('map', {
zoomControl: true
}).setView([10, 15], 2);

/* =========================
MAP STYLE
========================= */

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
attribution: '&copy; OpenStreetMap contributors'
}
).addTo(map);

/* =========================
COFFEE ORIGINS
========================= */

const coffeeOrigins = [

{
name: "Kenya",
coords: [-0.0236, 37.9062],
description: `
<b>Kenya</b><br>
Berry notes, bright acidity,
complex sweetness.
`
},

{
name: "Ethiopia — Guji",
coords: [9.145, 40.4897],
description: `
<b>Ethiopia — Guji</b><br>
Floral, peach, citrus,
tea-like finish.
`
},

{
name: "Brazil",
coords: [-14.235, -51.9253],
description: `
<b>Brazil</b><br>
Chocolate, nutty,
heavy body.
`
},

{
name: "Colombia",
coords: [4.5709, -74.2973],
description: `
<b>Colombia</b><br>
Caramel sweetness,
balanced acidity.
`
},

{
name: "Rwanda",
coords: [-1.9403, 29.8739],
description: `
<b>Rwanda</b><br>
Stone fruit,
floral complexity.
`
}

];

/* =========================
CUSTOM ICON
========================= */

const coffeeIcon = L.divIcon({
className: 'coffee-marker',
html: `<div class="marker-glow"></div>`,
iconSize: [18,18]
});

/* =========================
ADD MARKERS
========================= */

coffeeOrigins.forEach(origin => {

L.marker(origin.coords, {
icon: coffeeIcon
})
.addTo(map)
.bindPopup(origin.description);

});