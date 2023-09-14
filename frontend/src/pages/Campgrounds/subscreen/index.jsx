import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconMapPin } from '@tabler/icons-react';
import { Box, Container, Flex, Grid, Group, Loader, Title, Transition } from "@mantine/core";
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
import API from "../../../api/axios";
import EditDeleteButtons from "./components/EditDeleteButtons";
import useCamp from "../../../hooks/useCamp";
import useAuth from "../../../hooks/useAuth";
import AboutSection from "./components/AboutSection";
import HostSection from "./components/HostSection";

export function Component() {
    const { campgroundId } = useParams();
    const { user } = useAuth();
    const { campground, setCampground } = useCamp();
    const [initialView, setInitialView] = useState(false);
    const [loading, setLoading] = useState(true);
    const { ref: reserveWidgetRef, inView: reserveWidgetInView } = useInView();
    const { ref: photosRef, inView: photosInView } = useInView();
    const { scrollIntoView: scrollToPhotos, targetRef: targetPhotosRef } = useScrollIntoView({ offset: 140 });
    const { scrollIntoView: scrollToAmenities, targetRef: targetAmenitiesRef } = useScrollIntoView({ offset: 70 });
    const { scrollIntoView: scrollToActivities, targetRef: targetActivitiesRef } = useScrollIntoView({ offset: 70 });
    const { scrollIntoView: scrollToCalendar, targetRef: targetCalendarRef } = useScrollIntoView({ offset: 70 });
    const { scrollIntoView: scrollToReviews, targetRef: targetReviewsRef } = useScrollIntoView({ offset: 70 });

    useEffect(() => {
        const getData = async () => {
            await API.get(`/campgrounds/${campgroundId}`)
                .then(response => setCampground(response.data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false))
        }
        getData();
    }, []);

    useEffect(() => {
        if (photosInView === false) return
        else setInitialView(true);
    }, [photosInView]);

    return (
        <Container size={"xl"} p={30}>
            {loading ?
                <Flex justify={"center"} mt={"20%"}>
                    <Loader size={"xl"} />
                </Flex>
            :
                <>
                    <Transition transition="slide-down" mounted={initialView && !photosInView} duration={150} exitDuration={150}>
                        {(transitionStyles) => (
                            <NavMenu
                                style={transitionStyles}
                                showReserveDetails={!reserveWidgetInView}
                                actions={{ scrollToPhotos, scrollToAmenities, scrollToActivities, scrollToCalendar, scrollToReviews }}
                            />
                        )}
                    </Transition>
                    {(campground?.author && user?.userID === campground?.author?._id) && 
                        <EditDeleteButtons />
                    }
                    <Group spacing={5}>
                        <IconMapPin />
                        <Title order={4} mt={4}>{campground.location}</Title>
                    </Group>
                    <Box ref={(el) => { targetPhotosRef; photosRef(el); }}>
                        <ImageGallery />
                    </Box>
                    <Grid>
                        <Grid.Col span={7}>
                            <AboutSection />
                            <Box ref={targetAmenitiesRef}>
                                <AmenitiesSection />
                            </Box>
                            <Box ref={targetActivitiesRef}>
                                <ActivitiesSection />
                            </Box>
                            <Box ref={targetCalendarRef}>
                                <BookingCalendar />
                            </Box>
                        </Grid.Col>
                        <Grid.Col span={5} ref={reserveWidgetRef}>
                            <ReserveWidget actions={{ scrollToCalendar, scrollToReviews }} />
                        </Grid.Col>
                    </Grid>
                    <Box ref={targetReviewsRef}>
                        <ReviewsSection />
                    </Box>
                    <MapSection />
                    <HostSection />
                </>
            }
        </Container>
    )
}