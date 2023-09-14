import { Button, Container, Divider, Grid, Group, HoverCard, Paper, Text, rem } from "@mantine/core";
import { IconInfoCircle, IconStarFilled } from '@tabler/icons-react';
import useCamp from "../../../../hooks/useCamp";
import { useNavigate } from "react-router-dom";

export default function ({ actions }) {
    const { scrollToCalendar, scrollToReviews } = actions;
    const navigate = useNavigate();
    const { campground, checkoutDetails } = useCamp();
    const {
        checkInDate,
        checkOutDate,
        nights,
        priceOfStay,
        weeklyStayDiscount,
        serviceFee,
        totalBeforeTaxes
    } = checkoutDetails;

    const handleCheckout = () => {
        navigate('/checkout');
    }

    return (
        <Paper shadow="lg" p="xl" m={"30px 60px"} radius="lg" withBorder pos="sticky" top={rem(100)}>
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
                <Group spacing={5} onClick={scrollToReviews} sx={{ cursor: "pointer" }}>
                    {(campground.reviews && campground.reviews.length > 0) &&
                        <Group spacing={5} align="baseline">
                            <IconStarFilled size={14} />
                            <Text fw={700}>{campground.averageRating}</Text> · <Text opacity={0.5}>{campground.reviews.length} reviews</Text>
                        </Group>
                    }
                </Group>
            </Group>
            <Container p={0} my={20}>
                <Grid grow gutter={0}>
                    <Grid.Col span={6}>
                        <Paper p="xs" withBorder sx={{ cursor: "pointer" }} onClick={scrollToCalendar}>
                            <Text tt="uppercase" fz="xs" fw={700}>Check-in</Text>
                            {checkInDate ? (
                                <Text fz="sm">{checkInDate.format("DD/MM/YYYY")}</Text>
                            ) : (
                                <Text c="dimmed" fz="sm">Add date</Text>
                            )}
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Paper p="xs" withBorder sx={{ cursor: "pointer" }} onClick={scrollToCalendar}>
                            <Text tt="uppercase" fz="xs" fw={700}>Check-out</Text>
                            {checkOutDate ? (
                                <Text fz="sm">{checkOutDate.format("DD/MM/YYYY")}</Text>
                            ) : (
                                <Text c="dimmed" fz="sm">Add date</Text>
                            )}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Container>
            <Group>
                {nights ? (
                    <Button radius={"md"} color="teal" fullWidth size="lg" onClick={handleCheckout} >
                        Reserve
                    </Button>
                ) : (
                    <Button radius={"md"} fullWidth size="lg" onClick={scrollToCalendar}>
                        Check availability
                    </Button>
                )}
            </Group>
            {nights &&
                <>
                    <Group position="apart" fz="lg" my={20}>
                        <Text>{`$${campground.price.toFixed(0)} x ${nights} ${nights > 1 ? "nights" : "night"}`}</Text>
                        <Text>${priceOfStay}</Text>
                    </Group>
                    {(nights >= 7) &&
                        <Group position="apart" fz="lg" my={20}>
                            <Text>Weekly stay discount</Text>
                            <Text c="#008A05"> -${weeklyStayDiscount} </Text>
                        </Group>
                    }
                    <Group position="apart" fz="lg" my={20}>
                        <Group spacing={7}>
                            <HoverCard shadow="md" openDelay={200}>
                                <Text>YelpCamp service fee</Text>
                                <HoverCard.Target>
                                    <IconInfoCircle size="1.2rem" style={{ opacity: 0.5 }} />
                                </HoverCard.Target>
                                <HoverCard.Dropdown>
                                    <Text size="sm">This helps us run our platform and offer services like 24/7 support on your trip.</Text>
                                </HoverCard.Dropdown>
                            </HoverCard>
                        </Group>
                        <Text>${serviceFee}</Text>
                    </Group>
                    <Divider my={20} />
                    <Group position="apart" fz="lg" fw={700} my={20}>
                        <Text>Total before taxes</Text>
                        <Text>${totalBeforeTaxes}</Text>
                    </Group>
                </>
            }
        </Paper>
    )
}