import { IconHeart } from '@tabler/icons-react';
import {
    Card,
    Image,
    Text,
    Group,
    Button,
    ActionIcon,
    createStyles,
    rem,
    Rating,
} from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    section: {
        borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        paddingBottom: theme.spacing.md,
    },

    like: {
        color: theme.colors.red[6],
    },

    label: {
        textTransform: 'uppercase',
        fontSize: theme.fontSizes.xs,
        fontWeight: 700,
    },
}));

export function CGCard({ id, images, title, description }) {
    const { classes } = useStyles();

    return (
        <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
                <Image src={images[0].url} alt={title} height={180} />
            </Card.Section>

            <Card.Section className={classes.section} mt="md">
                <Group position="apart">
                    <Text fz="lg" fw={500}>
                        {title}
                    </Text>
                </Group>
                <Rating value={3.5} fractions={2} readOnly />
                <Text fz="sm" mt="xs">
                    {description}
                </Text>
            </Card.Section>

            <Group mt="xs">
                <Button component={Link} to={`${id}`} relative='path' radius="md" style={{ flex: 1 }}>
                    Show details
                </Button>
                <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart size="1.1rem" className={classes.like} stroke={1.5} />
                </ActionIcon>
            </Group>
        </Card>
    );
}