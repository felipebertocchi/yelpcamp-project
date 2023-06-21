import { createStyles, Container, Group, Anchor, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    footer: {
        marginTop: rem(120),
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
        maxWidth: '80rem',
        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export default function ({ links }) {
    const { classes } = useStyles();
    const items = links.map((link) => (
        <Anchor
            color="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()
            }
            size="sm"
        >
            {link.label}
        </Anchor >
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <span>&copy; YelpCamp 2023</span>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
}