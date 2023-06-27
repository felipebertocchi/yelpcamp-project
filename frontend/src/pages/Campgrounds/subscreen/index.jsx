import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconMapPin } from '@tabler/icons-react';
import { Box, Grid, Group, Text, Title } from "@mantine/core";
import ImageGallery from "./components/ImageGallery";
import ActivitiesSection from "./components/ActivitiesSection";
import AmenitiesSection from "./components/AmenitiesSection";
import BookingCalendar from "./components/BookingCalendar";
import ReviewsSection from "./components/ReviewsSection";
import MapSection from "./components/MapSection";
import { useScrollIntoView } from "@mantine/hooks";
import ReserveWidget from "./components/ReserveWidget";

export function Component() {
    const { campgroundId } = useParams();
    const [campground, setCampground] = useState(null);
    const [bookingDates, setBookingDates] = useState([null, null]);
    const { scrollIntoView: scrollToCalendar, targetRef: targetCalendarRef } = useScrollIntoView({
        offset: 350,
    });
    const { scrollIntoView: scrollToReviews, targetRef: targetReviewsRef } = useScrollIntoView();

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
                    <Grid>
                        <Grid.Col span={7}>
                            <Title my={30}>{campground.title}</Title>
                            <Title order={3} my={15}>About this campground</Title>
                            <Text fz='lg'>{campground.description}</Text>
                            <AmenitiesSection amenities={campground.amenities} />
                            <ActivitiesSection activities={campground.activities} />
                            <Box ref={targetCalendarRef}>
                                <BookingCalendar campgroundName={campground.title} bookingDates={bookingDates} setBookingDates={setBookingDates} />
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={5}>
                            <ReserveWidget campground={campground} bookingDates={bookingDates} actions={{ scrollToCalendar, scrollToReviews }} />
                        </Grid.Col>
                    </Grid>
                    <Box ref={targetReviewsRef}>
                        <ReviewsSection campgroundId={campgroundId} reviews={campground.reviews} avgRating={campground.averageRating} />
                    </Box>
                    <MapSection geometry={campground.geometry} />
                </>
            }
        </>
    )
}