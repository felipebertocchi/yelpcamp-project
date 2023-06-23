import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconMapPin } from '@tabler/icons-react';
import { Divider, Group, Text, Title } from "@mantine/core";
import ImageGallery from "./components/ImageGallery";

export function Component() {
    const { campgroundId } = useParams();
    const [campground, setCampground] = useState(null);

    useEffect(() => {
        const getData = async () => {
            await axios.get(`http://localhost:4000/campgrounds/${campgroundId}`)
                .then(response => {
                    setCampground(response.data);
                })
                .catch(err => {
                    console.error(err);
                })
        }
        getData();
    }, [])

    return (
        <>
            {campground &&
                <>
                    <Group spacing={5}>
                        <IconMapPin />
                        <Title order={4} mt={4}>{campground.location}</Title>
                    </Group>
                    <ImageGallery images={campground.images} />
                    <Title my={30}>{campground.title}</Title>
                    <Title order={3} my={15}>About this campground</Title>
                    <Text fz='lg'>{campground.description}</Text>
                    <Divider my='lg' />
                </>
            }
        </>
    )
}