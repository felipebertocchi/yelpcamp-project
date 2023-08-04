import { createStyles, Container, Group, rem, Footer } from '@mantine/core';
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    footer: {
        borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
        marginTop: 'auto',
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

    link: {
        textDecoration: 'none',
        color: 'unset',
        '&:hover': {
            color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[6],
        },
    },
}));

const links = [
    {
        "link": "/",
        "label": "Home"
    },
    {
        "link": "/about",
        "label": "About"
    },
    {
        "link": "/campgrounds",
        "label": "Campgrounds"
    },
    {
        "link": "/login",
        "label": "Login"
    },
    {
        "link": "/register",
        "label": "Register"
    },
]

export default function () {
    const { classes } = useStyles();
    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            size="sm"
            className={classes.link}
        >
            {link.label}
        </Link >
    ));

    return (
        <Footer className={classes.footer}>
            <Container className={classes.inner}>
                <span>&copy; YelpCamp 2023</span>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </Footer>
    );
}