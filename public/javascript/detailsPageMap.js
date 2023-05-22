mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: campground.geometry.coordinates,
    zoom: 9
});

const popup = new mapboxgl.Popup({ offset: 35, closeButton: false })
    .setHTML(`
        <h5 class="card-title mb-2">${campground.title}</h5>
        <h6 class="card-subtitle text-muted">
            <i class="bi bi-geo-alt"> </i>${campground.location}
        </h6>
    `)

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);

map.dragRotate.disable();
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl({
    showCompass: false
}));