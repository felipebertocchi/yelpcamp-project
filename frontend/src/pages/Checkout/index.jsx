import { Accordion, Button, Container, Divider, Grid, Group, HoverCard, Image, Paper, Radio, Stack, Text, Title, createStyles, rem } from "@mantine/core";
import { IconInfoCircle, IconStarFilled } from "@tabler/icons-react";
import useCamp from "../../hooks/useCamp";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreditCardForm from "./components/CreditCardForm";

const useStyles = createStyles((theme) => ({
    root: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        borderRadius: theme.radius.sm,
    },

    item: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        border: `${rem(1)} solid transparent`,
        position: 'relative',
        zIndex: 0,
        transition: 'transform 150ms ease',

        '&[data-active]': {
            transform: 'scale(1.02)',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
            boxShadow: theme.shadows.md,
            borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
            borderRadius: theme.radius.md,
            zIndex: 1,
        },
    },

    option: {
        cursor: "pointer",
    }
}));

export function Component() {
    const { campground, checkoutDetails } = useCamp();
    const { classes } = useStyles();
    const navigate = useNavigate();
    const {
        checkInDate,
        checkOutDate,
        nights,
        priceOfStay,
        weeklyStayDiscount,
        serviceFee,
        totalBeforeTaxes
    } = checkoutDetails;
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const [paymentPlan, setPaymentPlan] = useState("full");

    useEffect(() => {
        if (!campground) navigate('/');
    }, []);

    const handleSelectPaymentMethod = (option) => {
        setPaymentMethod(option);
    }

    const handleSelectPaymentPlan = (option) => {
        setPaymentPlan(option);
    }

    return (
        <Container size={"xl"} mt={60}>
            {campground && 
                <Grid gutter={55}>
                    <Grid.Col span={7}>
                        <Title mb="lg">
                            Book your stay at {campground?.title}
                        </Title>
                        <Title order={3}>
                            Dates
                        </Title>
                        <Text>
                            {checkInDate.format("MMM DD")} - {checkOutDate.format("MMM DD")}
                        </Text>
                        <Divider my="lg" />
                        <Title order={3} mb="lg">
                            Choose payment method
                        </Title>
                        <Paper withBorder>
                            <Accordion
                                mx="auto"
                                variant="filled"
                                defaultValue="cash"
                                classNames={classes}
                                className={classes.root}
                            >
                                <Accordion.Item value="cash" onClick={() => handleSelectPaymentMethod("cash")} pb="xs">
                                    <Accordion.Control>
                                        <Group>
                                            <Radio checked={paymentMethod === "cash"} readOnly/>
                                            <Title order={4}>Cash</Title>
                                        </Group>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Text ml="xs">Pay the total (${checkoutDetails.totalBeforeTaxes}) when you arrive at the campground</Text>
                                    </Accordion.Panel>
                                </Accordion.Item>
                                <Accordion.Item value="credit-card" onClick={() => handleSelectPaymentMethod("credit-card")} pb="xs">
                                    <Accordion.Control>
                                        <Group>
                                            <Radio checked={paymentMethod === "credit-card"} readOnly/>
                                            <Title order={4}>Credit card</Title>
                                        </Group>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Text ml="xs">Please enter your credit card information below</Text>
                                        <CreditCardForm />
                                        <Title order={4} my="sm" ml="xs">
                                            Choose payment plan
                                        </Title>
                                        <Stack spacing={5} mx="sm">
                                            <Paper withBorder className={classes.option} p="lg" mb="xs" onClick={() => handleSelectPaymentPlan("full")}>
                                                <Group>
                                                    <Radio checked={paymentPlan === "full"} readOnly/>
                                                    <div>
                                                        <Title order={4}>Pay in full</Title>
                                                        <Text>Pay the total (${checkoutDetails.totalBeforeTaxes}) now and you're all set.</Text>
                                                    </div>
                                                </Group>
                                            </Paper>
                                            <Paper withBorder className={classes.option} p="lg" onClick={() => handleSelectPaymentPlan("part")}>
                                                <Group>
                                                    <Radio checked={paymentPlan === "part"} readOnly/>
                                                    <div>
                                                        <Title order={4}>Pay part now, part later</Title>
                                                        <Text>${checkoutDetails.totalBeforeTaxes / 2} due today, ${checkoutDetails.totalBeforeTaxes / 2} on {checkOutDate.add(3, 'days').format("MMM DD YYYY")}. No extra fees.</Text>
                                                    </div>
                                                </Group>
                                            </Paper>
                                        </Stack>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            </Accordion>
                        </Paper>
                    </Grid.Col>
                    <Grid.Col span={5}>
                        <Paper withBorder p={24} radius={10}>
                            <Group>
                                <Image height={130} width={200} radius="md" src={campground.images[0]?.url} alt="camp-image" />
                                <Stack>
                                    <Title order={4}>
                                        {campground.title}
                                    </Title>
                                    <Group align="baseline" spacing={5}>
                                        <Text fz={18} span fw={500}>
                                            ${campground.price.toFixed(0)}
                                        </Text>
                                        <Text span fz="md">
                                            {' '}
                                            / night
                                        </Text>
                                    </Group>
                                    <Group spacing={5}>
                                        {(campground.reviews && campground.reviews.length > 0) &&
                                            <Group spacing={5} align="baseline">
                                                <IconStarFilled size={14} />
                                                <Text fw={700}>{campground.averageRating}</Text> · <Text opacity={0.5}>{campground.reviews.length} reviews</Text>
                                            </Group>
                                        }
                                    </Group>
                                </Stack>
                            </Group>
                            <Divider my={20} />
                            <Title order={2}>Price details</Title>
                            <Group position="apart" fz="lg" my={20}>
                                <Text>{`$${campground?.price.toFixed(2)} x ${nights} ${nights > 1 ? "nights" : "night"}`}</Text>
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
                            <Button radius={"md"} color="teal" fullWidth size="lg">
                                Reserve
                            </Button>
                        </Paper>
                    </Grid.Col>
                </Grid>
            }
        </Container>
    )
}