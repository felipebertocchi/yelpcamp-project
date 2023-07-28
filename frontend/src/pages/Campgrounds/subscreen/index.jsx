import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconMapPin, IconPencil, IconX } from '@tabler/icons-react';
import { Box, Button, Grid, Group, Text, Title, Transition } from "@mantine/core";
import ImageGallery from "./components/ImageGallery";
import ActivitiesSection from "./components/ActivitiesSection";
import AmenitiesSection from "./components/AmenitiesSection";
import BookingCalendar from "./components/BookingCalendar";
import ReviewsSection from "./components/ReviewsSection";
import MapSection from "./components/MapSection";
import { useScrollIntoView } from "@mantine/hooks";
import ReserveWidget from "./components/ReserveWidget";
import NavMenu from "./components/NavMenu";
import { useInView } from 'react-intersection-observer';
import { notifications } from "@mantine/notifications";
import { AuthContext } from "../../../auth/AuthContext";

export function Component() {
    const { campgroundId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [campground, setCampground] = useState(null);
    const [bookingDates, setBookingDates] = useState([null, null]);
    const [initialView, setInitialView] = useState(false);
    const { ref: reserveWidgetRef, inView: reserveWidgetInView } = useInView();
    const { ref: photosRef, inView: photosInView } = useInView();
    const { scrollIntoView: scrollToPhotos, targetRef: targetPhotosRef } = useScrollIntoView({ offset: 140 });
    const { scrollIntoView: scrollToAmenities, targetRef: targetAmenitiesRef } = useScrollIntoView({ offset: 70 });
    const { scrollIntoView: scrollToActivities, targetRef: targetActivitiesRef } = useScrollIntoView({ offset: 70 });
    const { scrollIntoView: scrollToCalendar, targetRef: targetCalendarRef } = useScrollIntoView({ offset: 70 });
    const { scrollIntoView: scrollToReviews, targetRef: targetReviewsRef } = useScrollIntoView({ offset: 70 });

    useEffect(() => {
        const getData = async () => {
            await axios.get(`${import.meta.env.VITE_BACKEND_DOMAIN}/campgrounds/${campgroundId}`)
                .then(response => {
                    setCampground(response.data);
                })
                .catch(err => {
                    console.error(err);
                    notifications.show({
                        title: 'Error',
                        message: err.response.data?.message,
                        withBorder: true,
                        color: 'red',
                        icon: <IconX />,
                    });
                })
        }
        getData();
    }, []);


    useEffect(() => {
        if (photosInView === false) return
        else setInitialView(true);
    }, [photosInView]);

    return (
        <>
            {campground &&
                <>
                    <Transition transition="slide-down" mounted={initialView && !photosInView} duration={150} exitDuration={150}>
                        {(transitionStyles) => (
                            <NavMenu
                                style={transitionStyles}
                                showReserveDetails={!reserveWidgetInView}
                                campground={campground}
                                bookingDates={bookingDates}
                                actions={{ scrollToPhotos, scrollToAmenities, scrollToActivities, scrollToCalendar, scrollToReviews }}
                            />
                        )}
                    </Transition>
                    {(user?._id === campground?.author?._id) && (
                        <Group position="right">
                            <Button
                                leftIcon={<IconPencil size={"1.2rem"} />}
                                variant="default"
                                onClick={() => navigate('edit')}
                            >
                                Edit
                            </Button>
                        </Group>
                    )}
                    <Group spacing={5}>
                        <IconMapPin />
                        <Title order={4} mt={4}>{campground.location}</Title>
                    </Group>
                    <Box ref={(el) => { targetPhotosRef; photosRef(el); }}>
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
                        <Grid.Col span={5} ref={reserveWidgetRef}>
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