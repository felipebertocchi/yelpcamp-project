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
import NavMenu from "./components/NavMenu";

export function Component() {
    const { campgroundId } = useParams();
    const [campground, setCampground] = useState(null);
    const [bookingDates, setBookingDates] = useState([null, null]);
    const [showNavMenu, setShowNavMenu] = useState(false);
    const { scrollIntoView: scrollToPhotos, targetRef: targetPhotosRef } = useScrollIntoView({ offset: 140 });
    const { scrollIntoView: scrollToAmenities, targetRef: targetAmenitiesRef } = useScrollIntoView({ offset: 70 });
    const { scrollIntoView: scrollToActivities, targetRef: targetActivitiesRef } = useScrollIntoView({ offset: 70 });
    const { scrollIntoView: scrollToCalendar, targetRef: targetCalendarRef } = useScrollIntoView({ offset: 70 });
    const { scrollIntoView: scrollToReviews, targetRef: targetReviewsRef } = useScrollIntoView({ offset: 70 });

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
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const threshold = 700;

            if (scrollPosition > threshold) {
                setShowNavMenu(true);
            } else {
                setShowNavMenu(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () =>
            window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {campground &&
                <>
                    {showNavMenu && <NavMenu campground={campground} actions={{ scrollToPhotos, scrollToAmenities, scrollToActivities, scrollToCalendar, scrollToReviews }} />}
                    <Group spacing={5}>
                        <IconMapPin />
                        <Title order={4} mt={4}>{campground.location}</Title>
                    </Group>
                    <Box ref={targetPhotosRef}>
                        <ImageGallery images={campground.images} />
                    </Box>
                    <Grid>
                        <Grid.Col span={7}>
                            <Title my={30}>{campground.title}</Title>
                            <Title order={3} my={15}>About this campground</Title>
                            <Text fz='lg'>{campground.description}</Text>
                            <Box ref={targetAmenitiesRef}>
                                <AmenitiesSection amenities={campground.amenities} />
                            </Box>
                            <Box ref={targetActivitiesRef}>
                                <ActivitiesSection activities={campground.activities} />
                            </Box>
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