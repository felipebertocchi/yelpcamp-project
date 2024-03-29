import { Avatar, Divider, Group, Paper, Rating, SimpleGrid, Spoiler, Text, Title } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import ReviewModal from "./ReviewModal";
import useCamp from "../../../../hooks/useCamp";

export default function () {
    const { campground } = useCamp();
    const { reviews, averageRating } = campground;

    return (
        <>
            <Divider my='lg' />
            <Title order={3} my={15}>
                <Group spacing={5}>
                    {reviews && reviews.length > 0 &&
                        <Group spacing={5}>
                            <IconStarFilled size={20} /> {`${averageRating} · ${reviews.length} `}
                        </Group>
                    }
                    Reviews
                </Group>
            </Title>
            {(reviews && reviews.length > 0) ? (
                <SimpleGrid cols={2} spacing="xl" verticalSpacing="xl">
                    {reviews.map(({ rating, body, author, createdAt }, index) => (
                        <Paper key={index} p='lg' withBorder>
                            <Group mb={15} spacing={10}>
                                <Avatar color="cyan" radius="xl"></Avatar>
                                <div>
                                    <Text fw={700} size="md" tt="capitalize" ml={4}>{author?.name || "Anonymous"}</Text>
                                    <Group spacing={8}>
                                        <Rating mb={4} value={rating} readOnly />
                                        <Text color="dimmed">{createdAt}</Text>
                                    </Group>
                                </div>
                            </Group>
                            <Spoiler maxHeight={50} showLabel="Show more" hideLabel="Hide">
                                <Text>{body}</Text>
                            </Spoiler>
                        </Paper>
                    ))}
                </SimpleGrid>
            ) : (
                <Text color="dimmed">There are no reviews yet. Be the first one to write one!</Text>
            )}
            <ReviewModal />
        </>
    )
}