import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    Paper,
    Transition,
    rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import PageLink from './PageLink';
import { Link, useNavigate } from 'react-router-dom';
import UserMenu from './UserMenu';
import API from '../../api/axios';

const HEADER_HEIGHT = rem(70);

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1,
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },
}));


export default function () {
    const [opened, { toggle, close }] = useDisclosure(false);
    const { classes } = useStyles();
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const userLinks = (user) => {
        if (user) {
            return (
                <>
                    <PageLink page={"campgrounds/new"} label={"Add your campground"} onClick={close} />
                    <UserMenu user={user} actions={{ logOut }} />
                </>
            )
        } else {
            return (
                <>
                    <PageLink page={"login"} onClick={close} />
                    <PageLink page={"register"} onClick={close} />
                </>
            )
        }
    }

    const logOut = async (e) => {
        e.preventDefault()
        await API.get('/logout')
            .then(() => {
                setUser(null);
                return navigate("/");
            })
            .catch(error => console.error('Error logging out:', error))
            .finally(close);
    };

    return (
        <Header height={HEADER_HEIGHT} className={classes.root}>
            <Container size={"xl"} className={classes.header}>
                <Group spacing={10}>
                    <Link to={'/'}>
                        <Logo />
                    </Link>
                    <Group spacing={5} className={classes.links}>
                        <PageLink page={"campgrounds"} onClick={close} />
                        <PageLink page={"about"} onClick={close} />
                    </Group>
                </Group>

                <Group spacing={5} className={classes.links}>
                    {userLinks(user)}
                    <ThemeToggle />
                </Group>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size="md" />

                <Transition transition="slide-down" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} pb={5} radius={15} withBorder style={styles}>
                            <PageLink page={"campgrounds"} onClick={close} />
                            {userLinks(user)}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}