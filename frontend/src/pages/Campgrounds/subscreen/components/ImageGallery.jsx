import { useState } from "react";
import { Box, Grid, SimpleGrid } from "@mantine/core";
import ImageBox from "./ImageBox";
import FullScreenCarousel from "./FullScreenCarousel";

export default function ({ images }) {
    const [openCarousel, setOpenCarousel] = useState(false);
    const [initialSlide, setInitialSlide] = useState(0);

    const handleCarousel = (index) => {
        setOpenCarousel(true);
        setInitialSlide(index);
    }

    return (
        <Box my="md">
            <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
                <Box onClick={() => handleCarousel(0)}>
                    <ImageBox src={images[0]?.url} alt={"campground-image"} height={515} />
                </Box>
                <Grid gutter="md">
                    <Grid.Col onClick={() => handleCarousel(1)}>
                        <ImageBox src={images[1]?.url} alt={"campground-image"} height={250} />
                    </Grid.Col>
                    <Grid.Col onClick={() => handleCarousel(2)} span={6}>
                        <ImageBox src={images[2]?.url} alt={"campground-image"} height={250} />
                    </Grid.Col>
                    <Grid.Col onClick={() => handleCarousel(3)} span={6}>
                        <ImageBox src={images[3]?.url} alt={"campground-image"} height={250} />
                    </Grid.Col>
                </Grid>
            </SimpleGrid>
            <FullScreenCarousel images={images} open={openCarousel} setOpen={setOpenCarousel} initialSlide={initialSlide} />
        </Box>
    )
}