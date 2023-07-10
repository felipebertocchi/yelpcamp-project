import { Button, Group, Header, Stack, Text, UnstyledButton, createStyles, rem } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
    navBtn: {
        borderBottom: "0.2rem solid transparent",
        '&:hover': {
            borderBottom: "0.2rem solid black"
        },
    }
}));

export default function ({ campground, actions }) {
    const { scrollToPhotos, scrollToAmenities, scrollToActivities, scrollToCalendar, scrollToReviews } = actions;
    const { classes } = useStyles();

    const links = {
        "Photos": scrollToPhotos,
        "Amenities": scrollToAmenities,
        "Activities": scrollToActivities,
        "Booking": scrollToCalendar,
        "Reviews": scrollToReviews,
    }

    const navButtons = Object.keys(links).map(link => {
        return (
            <UnstyledButton key={link} className={classes.navBtn} fw={600} h={"100%"} px={10} onClick={links[link]}>
                {link}
            </UnstyledButton>
        )
    })

    return (
        <Header className="navMenu" pos="sticky" top={0} height={rem(80)} p={0}>
            <Group position="apart" h={"100%"}>
                <Group h={"100%"}>
                    {navButtons}
                </Group>
                <Group spacing={20}>
                    <Stack spacing={0}>
                        <Group spacing={5} align="baseline">
                            <Text fz={22} span fw={500}>
                                ${campground.price.toFixed(0)}
                            </Text>
                            <Text span fz="md">
                                {' '}
                                / night
                            </Text>
                        </Group>
                        <Group spacing={5} onClick={scrollToReviews} sx={{ cursor: "pointer" }}>
                            {(campground.reviews && campground.reviews.length > 0) &&
                                <Group spacing={5} align="baseline">
                                    <IconStarFilled size={12} />
                                    <Text fz={14} fw={700}>{campground.averageRating}</Text> · <Text fz={14} opacity={0.5}>{campground.reviews.length} reviews</Text>
                                </Group>
                            }
                        </Group>
                    </Stack>
                    <Button size="lg" onClick={scrollToCalendar}>
                        Check availability
                    </Button>
                </Group>
            </Group>
        </Header>
    )
}