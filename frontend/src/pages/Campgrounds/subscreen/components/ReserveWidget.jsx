import { Button, Container, Grid, Group, Paper, Text } from "@mantine/core";
import { IconStarFilled } from '@tabler/icons-react';
import dayjs from 'dayjs';

export default function ({ campground, scrollIntoView, bookingDates }) {
    const [checkIn, checkOut] = bookingDates;
    const checkInDate = dayjs(checkIn).format("DD/MM/YYYY");
    const checkOutDate = dayjs(checkOut).format("DD/MM/YYYY");

    return (
        <Paper shadow="lg" p="xl" m={"30px 60px"} radius="lg" withBorder pos="sticky" top={30}>
            <Group position="apart">
                <div>
                    <Text fz={24} span fw={500}>
                        ${campground.price.toFixed(0)}
                    </Text>
                    <Text span fz="md">
                        {' '}
                        / night
                    </Text>
                </div>
                <Group spacing={5}>
                    {(campground.reviews && campground.reviews.length > 0) &&
                        <Group spacing={5}>
                            <IconStarFilled size={16} />
                            <Text fw={700}>{campground.averageRating}</Text> · <Text c="dimmed">{campground.reviews.length} reviews</Text>
                        </Group>
                    }
                </Group>
            </Group>
            <Container p={0} my={20}>
                <Grid grow gutter={0}>
                    <Grid.Col span={6}>
                        <Paper p="xs" withBorder sx={{ cursor: "pointer" }} onClick={scrollIntoView}>
                            <Text tt="uppercase" fz="xs" fw={700}>Check-in</Text>
                            {checkIn ? (
                                <Text fz="sm">{checkInDate}</Text>
                            ) : (
                                <Text c="dimmed" fz="sm">Add date</Text>
                            )}
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Paper p="xs" withBorder sx={{ cursor: "pointer" }} onClick={scrollIntoView}>
                            <Text tt="uppercase" fz="xs" fw={700}>Check-out</Text>
                            {checkOut ? (
                                <Text fz="sm">{checkOutDate}</Text>
                            ) : (
                                <Text c="dimmed" fz="sm">Add date</Text>
                            )}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Container>
            <Group>
                {(checkIn && checkOut) ? (
                    <Button fullWidth size="lg">
                        Reserve
                    </Button>
                ) : (
                    <Button fullWidth size="lg" onClick={scrollIntoView}>
                        Check availability
                    </Button>
                )}
            </Group>
        </Paper>
    )
}