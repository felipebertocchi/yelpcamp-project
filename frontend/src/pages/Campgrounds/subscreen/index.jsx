import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconMapPin } from '@tabler/icons-react';
import { Title } from "@mantine/core";
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
                    <Title mb={10}>{campground.title}</Title>
                    <div style={{ display: 'flex' }}>
                        <IconMapPin />
                        <Title order={3} ml={5}>{campground.location}</Title>
                    </div>
                    <ImageGallery images={campground.images} />
                </>
            }
        </>
    )
}