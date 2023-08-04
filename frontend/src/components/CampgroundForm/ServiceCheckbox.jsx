import { Checkbox, Group, Paper, Text, UnstyledButton, createStyles, rem } from "@mantine/core";

const useStyles = createStyles((theme, { checked }) => ({
    button: {
        transition: 'background-color 150ms ease, border-color 150ms ease',
        border: `${rem(1)} solid ${checked
            ? theme.fn.variant({ variant: 'outline', color: theme.primaryColor }).border
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[3]
            }`,
        backgroundColor: checked
            ? theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background
            : theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.white,
    },
}));

export default function ({ checked, list, service, icon, onClick }) {
    const { classes } = useStyles({ checked });

    return (
        <UnstyledButton onClick={() => onClick(list, service)}>
            <Paper p='sm' radius='lg' className={classes.button}>
                <Group>
                    {icon}
                    <Text fz='lg' tt='capitalize'>{service}</Text>
                    <Checkbox
                        size="md"
                        checked={checked}
                        styles={{ input: { cursor: 'pointer' } }}
                        onChange={() => null}
                    />
                </Group>
            </Paper>
        </UnstyledButton>
    )
}