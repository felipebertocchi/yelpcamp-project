import { createStyles, Image, Card, Text, Group, Button, getStylesRef, rem, Flex } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconMapPin, IconStar } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    price: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    carousel: {
        '&:hover': {
            [`& .${getStylesRef('carouselControls')}`]: {
                opacity: 1,
            },
            [`& .${getStylesRef('carouselIndicator')}`]: {
                opacity: 1,
            },
        },
    },

    carouselControls: {
        ref: getStylesRef('carouselControls'),
        transition: 'opacity 150ms ease',
        opacity: 0,
    },

    carouselIndicator: {
        ref: getStylesRef('carouselIndicator'),
        width: rem(4),
        height: rem(4),
        transition: 'width 250ms ease',
        opacity: 0,

        '&[data-active]': {
            width: rem(16),
            opacity: 0,
        },
    },
}));

export function CampCard({ id, images, title, location, description, price }) {
    const { classes } = useStyles();

    const slides = images.map(({ url }, index) => (
        <Carousel.Slide key={index}>
            <Link to={`${id}`} relative='path'>
                <Image src={url} height={220} />
            </Link>
        </Carousel.Slide>
    ));

    return (
        <Card radius="md" withBorder padding="md">
            <Card.Section>
                <Carousel
                    draggable={false}
                    withIndicators
                    loop
                    classNames={{
                        root: classes.carousel,
                        controls: classes.carouselControls,
                        indicator: classes.carouselIndicator,
                    }}
                >
                    {slides}
                </Carousel>
            </Card.Section>

            <Group position="apart" mt="lg">
                <Text fw={700} fz="lg">
                    {title}
                </Text>

            </Group>
            <Flex justify={'space-between'}>
                <Group spacing={3}>
                    <IconMapPin size="1rem" />
                    <Text fw={500} fz="sm">{location}</Text>
                </Group>
                <Group spacing={3}>
                    <IconStar size="1rem" />
                    <Text fw={500} fz="sm">4.78</Text>
                </Group>
            </Flex>

            <Text fz="sm" mt="sm">
                {description}
            </Text>

            <Group position="apart" mt="md">
                <div>
                    <Text fz="xl" span fw={500} className={classes.price}>
                        ${price.toFixed(0)}
                    </Text>
                    <Text span fz="sm" c="dimmed">
                        {' '}
                        / night
                    </Text>
                </div>

                <Button component={Link} to={`${id}`} relative='path' radius="md">Show details</Button>
            </Group>
        </Card>
    );
}