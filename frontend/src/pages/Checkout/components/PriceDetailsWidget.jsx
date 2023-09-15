import { Button, Divider, Group, HoverCard, Image, Paper, Stack, Text, Title } from "@mantine/core";
import { IconInfoCircle, IconStarFilled } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import useCamp from "../../../hooks/useCamp";
import CustomModal from "../../../components/modals/CustomModal";
import GithubBtn from "../../../components/buttons/GithubBtn";

export default function () {
    const [demoModalOpened, demoModal] = useDisclosure(false);
    const navigate = useNavigate();
    const { campground, checkoutDetails } = useCamp();
    const {
        nights,
        priceOfStay,
        weeklyStayDiscount,
        serviceFee,
        totalBeforeTaxes
    } = checkoutDetails;

    return (
        <>
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
                <Button radius={"md"} color="teal" fullWidth size="lg" onClick={demoModal.open}>
                    Reserve
                </Button>
            </Paper>
            <CustomModal opened={demoModalOpened} close={demoModal.close} size="lg" title={<Text fw={700}>The end</Text>}>
                <Paper px="xl">
                    <Text>
                        Thank you for exploring the campground rental demo!
                    </Text>
                    <Text my="sm">
                        Please note that this is a demonstration project, and the payment process is for display purposes only. You won't be charged any actual fees, and no real transactions will occur. It's simply a showcase of the site's features.
                    </Text>
                    <Text>
                        We hope you enjoyed using this platform to explore campground options. If you have any questions or feedback, feel free to reach out in the project's repository:
                    </Text>
                    <Group mt="lg">
                        <GithubBtn>Link to Repository</GithubBtn>
                        <Button onClick={() => navigate('/campgrounds')}>Go to campgrounds</Button>
                    </Group>
                </Paper>
            </CustomModal>
        </>
    )
}