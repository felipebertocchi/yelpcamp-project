import { useEffect, useRef } from 'react';
import { Box, Divider, Title } from "@mantine/core";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function ({ geometry }) {
    const [lng, lat] = geometry.coordinates;
    const mapContainer = useRef(null);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: 12
        });

        new mapboxgl.Marker({ color: '#F84D4D' })
            .setLngLat(geometry.coordinates)
            .addTo(map);

        map.dragRotate.disable();
        map.addControl(new mapboxgl.FullscreenControl());
        map.addControl(new mapboxgl.NavigationControl({
            showCompass: false
        }));

        // Clean up on unmount
        return () => map.remove();
    });


    return (
        <>
            <Divider my='lg' />
            <Title order={3} my={15}>Map of the Campground</Title>
            <Box h={500} ref={mapContainer} className="map-container" />
        </>
    )
}