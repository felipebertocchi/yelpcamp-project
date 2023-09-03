import { useState } from "react";
import { Box, Grid, SimpleGrid } from "@mantine/core";
import ImageBox from "./ImageBox";
import FullScreenCarousel from "./FullScreenCarousel";
import { useDisclosure } from "@mantine/hooks";
import useCamp from "../../../../hooks/useCamp";

export default function () {
    const [openedFS, handleOpenFS] = useDisclosure(false);
    const [initialSlide, setInitialSlide] = useState(0);
    const { campground } = useCamp();
    const { images } = campground;

    const handleCarousel = (index) => {
        setInitialSlide(index);
        handleOpenFS.open();
    }

    const PhotoGrid = () => {
        if (images.length < 2) {
            return (
                <Box onClick={() => handleCarousel(0)}>
                    <ImageBox src={images[0]?.url} alt={"campground-image"} height={515} />
                </Box>
            )
        } else if (images.length === 2) {
            return (
                <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
                    <Box onClick={() => handleCarousel(0)}>
                        <ImageBox src={images[0]?.url} alt={"campground-image"} height={515} />
                    </Box>
                    <Box onClick={() => handleCarousel(1)}>
                        <ImageBox src={images[1]?.url} alt={"campground-image"} height={515} />
                    </Box>
                </SimpleGrid>
            )
        } else if (images.length === 3) {
            return (
                <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
                    <Box onClick={() => handleCarousel(0)}>
                        <ImageBox src={images[0]?.url} alt={"campground-image"} height={515} />
                    </Box>
                    <Grid gutter="md">
                        <Grid.Col onClick={() => handleCarousel(1)}>
                            <ImageBox src={images[1]?.url} alt={"campground-image"} height={250} />
                        </Grid.Col>
                        <Grid.Col onClick={() => handleCarousel(2)}>
                            <ImageBox src={images[2]?.url} alt={"campground-image"} height={250} />
                        </Grid.Col>
                    </Grid>
                </SimpleGrid>
            )
        } else if (images.length === 4) {
            return (
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
            )
        } else if (images.length >= 5) {
            return (
                <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'xs', cols: 1 }]}>
                    <Box onClick={() => handleCarousel(0)}>
                        <ImageBox src={images[0]?.url} alt={"campground-image"} height={515} />
                    </Box>
                    <Grid gutter="md">
                        <Grid.Col onClick={() => handleCarousel(1)} span={6}>
                            <ImageBox src={images[1]?.url} alt={"campground-image"} height={250} />
                        </Grid.Col>
                        <Grid.Col onClick={() => handleCarousel(2)} span={6}>
                            <ImageBox src={images[2]?.url} alt={"campground-image"} height={250} />
                        </Grid.Col>
                        <Grid.Col onClick={() => handleCarousel(3)} span={6}>
                            <ImageBox src={images[3]?.url} alt={"campground-image"} height={250} />
                        </Grid.Col>
                        <Grid.Col onClick={() => handleCarousel(4)} span={6}>
                            <ImageBox src={images[4]?.url} alt={"campground-image"} height={250} />
                        </Grid.Col>
                    </Grid>
                </SimpleGrid>
            )
        }
    }

    return (
        <Box my="md">
            <PhotoGrid />
            <FullScreenCarousel images={images} open={openedFS} handleOpen={handleOpenFS} initialSlide={initialSlide} />
        </Box>
    )
}