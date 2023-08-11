import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IconChevronDown, IconMapPin, IconPencil, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Box, Button, Container, Grid, Group, Menu, Text, Title, Transition } from "@mantine/core";
import ImageGallery from "./components/ImageGallery";
import ActivitiesSection from "./components/ActivitiesSection";
import AmenitiesSection from "./components/AmenitiesSection";
import BookingCalendar from "./components/BookingCalendar";
import ReviewsSection from "./components/ReviewsSection";
import MapSection from "./components/MapSection";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import ReserveWidget from "./components/ReserveWidget";
import NavMenu from "./components/NavMenu";
import { useInView } from 'react-intersection-observer';
import { AuthContext } from "../../../auth/AuthContext";
import DeleteModal from "./components/DeleteModal";
import API from "../../../api/axios";

export function Component() {
    const { campgroundId } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [campground, setCampground] = useState(null);
    const [bookingDates, setBookingDates] = useState([null, null]);
    const [initialView, setInitialView] = useState(false);
    const [openedDeleteModal, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure(false);
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
        }
        getData();
    }, []);


    useEffect(() => {
        if (photosInView === false) return
        else setInitialView(true);
    }, [photosInView]);

    return (
        <Container size={"xl"} p={30}>
            {campground &&
                <>
                    <DeleteModal opened={openedDeleteModal} close={closeDeleteModal} campgroundId={campgroundId} />
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
                    {(campground?.author && user?._id === campground?.author?._id) && (
                        <Group position="right" noWrap spacing={0}>
                            <Button
                                leftIcon={<IconPencil size={"1.2rem"} />}
                                variant="default"
                                style={{
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                }}
                                onClick={() => navigate('edit')}
                            >
                                Edit
                            </Button>
                            <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
                                <Menu.Target>
                                    <ActionIcon
                                        variant="default"
                                        size={36}
                                        style={{
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                            borderLeft: 0
                                        }}
                                    >
                                        <IconChevronDown size="1rem" stroke={1.5} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item
                                        onClick={openDeleteModal}
                                        icon={<IconTrash size="1rem" stroke={1.5} />}
                                        color="red"
                                    >
                                        Delete
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
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
        </Container>
    )
}