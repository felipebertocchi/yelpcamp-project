import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconMapPin } from '@tabler/icons-react';
import { Box, Grid, SimpleGrid, Title } from "@mantine/core";
import ImageBox from "./components/ImageBox";
import FullScreenCarousel from "./components/FullScreenCarousel";

export function Component() {
    const { campgroundId } = useParams();
    const [campground, setCampground] = useState(null);
    const [openCarousel, setOpenCarousel] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    const handleCarousel = (index) => {
        setOpenCarousel(true);
        setInitialSlide(index);
    }

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
                    <Box my="md">
                        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
                            <Box onClick={() => handleCarousel(0)}>
                                <ImageBox src={campground.images[0]?.url} alt={campground.title} height={515} />
                            </Box>
                            <Grid gutter="md">
                                <Grid.Col onClick={() => handleCarousel(1)}>
                                    <ImageBox src={campground.images[1]?.url} alt={campground.title} height={250} />
                                </Grid.Col>
                                <Grid.Col onClick={() => handleCarousel(2)} span={6}>
                                    <ImageBox src={campground.images[2]?.url} alt={campground.title} height={250} />
                                </Grid.Col>
                                <Grid.Col onClick={() => handleCarousel(3)} span={6}>
                                    <ImageBox src={campground.images[3]?.url} alt={campground.title} height={250} />
                                </Grid.Col>
                            </Grid>
                        </SimpleGrid>
                        <FullScreenCarousel images={campground.images} open={openCarousel} setOpen={setOpenCarousel} initialSlide={initialSlide} />
                    </Box>
                </>
            }
        </>
    )
}