import { useEffect, useRef } from 'react';
import { Box, Divider, Text, Title } from "@mantine/core";
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import useCamp from '../../../../hooks/useCamp';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

export default function () {
    const mapContainer = useRef(null);
    const { campground } = useCamp();
    const { geometry, location } = campground;
    const [lng, lat] = geometry.coordinates;

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
    }, []);


    return (
        <>
            <Divider my='lg' />
            <Title order={3} my={15}>Campground Location</Title>
            <Box h={500} ref={mapContainer} className="map-container" />
            <Title order={4} mt={25} mb={15}>{location}</Title>
            <Text fz='lg'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet doloremque voluptates blanditiis accusantium labore hic ab enim consequatur neque veniam alias deleniti officiis quaerat ad dolorum eaque accusamus quasi necessitatibus reprehenderit, impedit quos sit! Molestias commodi esse beatae veritatis provident, consequatur voluptas magni labore vero, ipsum quia repudiandae enim aliquid sequi iusto quam et eligendi sunt cupiditate quaerat! Accusamus commodi, optio hic vero quae nostrum rerum! Esse eum enim magni quia voluptate? Nihil porro explicabo corrupti eveniet repellendus eaque, dolores quaerat fugiat ipsam nisi dolore distinctio, atque excepturi pariatur esse! Assumenda amet, dolorem maiores sit sapiente ipsum ea deleniti explicabo possimus inventore? Laboriosam neque quidem sed rerum quam. Sapiente, voluptatem labore doloremque ipsum necessitatibus deserunt nobis fuga ratione.</Text>
        </>
    )
}