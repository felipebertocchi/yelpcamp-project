import { Text, UnstyledButton, createStyles, rem } from '@mantine/core';

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

export default function ({ label, onClick, active }) {
    const { classes, cx } = useStyles();

    return (
        <UnstyledButton
            key={label}
            className={cx(classes.link, { [classes.linkActive]: active })}
            onClick={onClick}
        >
            <Text>
                {label}
            </Text>
        </UnstyledButton>
    )
}