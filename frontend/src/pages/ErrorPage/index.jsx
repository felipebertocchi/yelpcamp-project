import { createStyles, Title, Text, Button, Container, Group, rem, Anchor } from '@mantine/core';
import { useRouteError } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    root: {
        paddingTop: rem(80),
        paddingBottom: rem(80),
    },

    label: {
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(220),
        lineHeight: 1,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(120),
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        textAlign: 'center',
        fontWeight: 900,
        fontSize: rem(34),

        [theme.fn.smallerThan('sm')]: {
            fontSize: rem(32),
        },
    },

    description: {
        maxWidth: rem(500),
        margin: 'auto',
        marginTop: theme.spacing.xl,
        marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    },
}));

export function ErrorPage() {
    const { classes } = useStyles();
    const error = useRouteError();
    console.error(error);

    return (
        <Container className={classes.root}>
            <div className={classes.label}>{error.status}</div>
            <Title className={classes.title}>Sorry, an unexpected error has occurred.</Title>
            <Text color="dimmed" size="lg" align="center" className={classes.description}>
                You may have mistyped the address, or the page has been moved to another URL.
            </Text>
            <Group position="center">
                <Button component={Anchor} href="/" size="md">
                    Go back to home page
                </Button>
            </Group>
        </Container>
    );
}