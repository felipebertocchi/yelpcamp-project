mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'cluster-map',
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [-103.5917, 40.6699],
    zoom: 3
});

map.dragRotate.disable();
map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl({
    showCompass: false
}));

map.loadImage(
    'images/mapbox-marker-icon-20px-red.png',
    (error, image) => {
        if (error) throw error;
        map.addImage('marker-icon', image);
    }); 

map.on('load', () => {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('campgrounds', {
        type: 'geojson',
        data: campgrounds,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#99AD4C',
                10, // amount of campgrounds
                '#509A63',
                30, // amount of campgrounds
                '#ECB54A',
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                10, // amount of campgrounds
                25,
                30, // amount of campgrounds
                32
            ],
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': [
                'step',
                ['get', 'point_count'],
                14,
                10, // amount of campgrounds
                16,
                30, // amount of campgrounds
                20
            ],
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        layout: {
            'icon-image': 'marker-icon',
            'icon-allow-overlap': true
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const { id, title, location } = e.features[0].properties;

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup({ offset: 18 })
            .setLngLat(coordinates)
            .setHTML(`
                <a href='campgrounds/${id}'><h5 class="mb-1">${title}</h5></a>
                <h6 class="text-muted">
                    <i class="bi bi-geo-alt"> </i>${location}
                </h6>
            `)
            .addTo(map);
    });

    map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
    });
});