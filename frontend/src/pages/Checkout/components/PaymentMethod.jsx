import { Accordion, Divider, Group, Paper, Radio, Stack, Text, Title, createStyles, rem } from "@mantine/core";
import { useState } from "react";
import CreditCardForm from "./CreditCardForm";
import useCamp from "../../../hooks/useCamp";

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

export default function () {
    const { classes } = useStyles();
    const [paymentMethod, setPaymentMethod] = useState("cash")
    const [paymentPlan, setPaymentPlan] = useState("full");
    const { checkoutDetails } = useCamp();
    const { checkOutDate, totalBeforeTaxes } = checkoutDetails;

    const handleSelectPaymentMethod = (option) => {
        setPaymentMethod(option);
    }

    const handleSelectPaymentPlan = (option) => {
        setPaymentPlan(option);
    }

    return (
        <>
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
                                <Radio checked={paymentMethod === "cash"} readOnly />
                                <Title order={4}>Cash</Title>
                            </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                            <Text ml="xs">Pay the total (${totalBeforeTaxes}) when you arrive at the campground</Text>
                        </Accordion.Panel>
                    </Accordion.Item>
                    <Accordion.Item value="credit-card" onClick={() => handleSelectPaymentMethod("credit-card")} pb="xs">
                        <Accordion.Control>
                            <Group>
                                <Radio checked={paymentMethod === "credit-card"} readOnly />
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
                                        <Radio checked={paymentPlan === "full"} readOnly />
                                        <div>
                                            <Title order={4}>Pay in full</Title>
                                            <Text>Pay the total (${totalBeforeTaxes}) now and you're all set.</Text>
                                        </div>
                                    </Group>
                                </Paper>
                                <Paper withBorder className={classes.option} p="lg" onClick={() => handleSelectPaymentPlan("part")}>
                                    <Group>
                                        <Radio checked={paymentPlan === "part"} readOnly />
                                        <div>
                                            <Title order={4}>Pay part now, part later</Title>
                                            <Text>${totalBeforeTaxes / 2} due today, ${totalBeforeTaxes / 2} on {checkOutDate.add(3, 'days').format("MMM DD YYYY")}. No extra fees.</Text>
                                        </div>
                                    </Group>
                                </Paper>
                            </Stack>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </Paper>
        </>
    )
}