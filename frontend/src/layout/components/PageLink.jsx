import { Text, createStyles, rem } from '@mantine/core';
import { NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.md,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.md,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },
}));

export default function ({ page, label, onClick }) {
    const { classes, cx } = useStyles();

    return (
        <NavLink
            key={page}
            to={"/" + page}
            className={({ isActive }) => cx(classes.link, { [classes.linkActive]: isActive })}
            onClick={onClick}
        >
            <Text tt={!label && "capitalize"}>
                {label || page}
            </Text>
        </NavLink>
    )
}