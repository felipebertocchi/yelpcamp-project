import { forwardRef } from 'react';
import { IconChevronDown, IconCreditCard, IconHeart, IconLogout, IconTent, IconUser } from '@tabler/icons-react';
import { Group, Avatar, Text, Menu, UnstyledButton, rem, Stack } from '@mantine/core';

const UserButton = forwardRef(
    ({ image, name, email, ...others }, ref) => (
        <UnstyledButton
            ref={ref}
            sx={(theme) => ({
                display: 'block',
                width: '100%',
                padding: `${rem(8)} ${rem(12)}`,
                borderRadius: theme.radius.md,
                color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

                '&:hover': {
                    backgroundColor:
                        theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                },
            })}
            {...others}
        >
            <Group spacing={"sm"}>
                <Avatar src={image} color="cyan" radius="xl" />

                <Stack spacing={0} style={{ flex: 1 }}>
                    <Text size="sm" weight={700}>
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {email}
                    </Text>
                </Stack>

                <IconChevronDown size={20} />
            </Group>
        </UnstyledButton>
    )
);

export default function ({ user, actions }) {
    const { logOut } = actions;

    return (
        <Group position="center">
            <Menu>
                <Menu.Target>
                    <UserButton
                        name={user.name}
                        email={user.email}
                    />
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item icon={<IconUser size={16} />} fz={"md"}>Profile</Menu.Item>
                    <Menu.Item icon={<IconTent size={16} />} fz={"md"}>My campgrounds</Menu.Item>
                    <Menu.Item icon={<IconHeart size={16} />} fz={"md"}>Favorites</Menu.Item>
                    <Menu.Item icon={<IconCreditCard size={16} />} fz={"md"}>Billing</Menu.Item>
                    <Menu.Divider />
                    <Menu.Item onClick={logOut} color="red" icon={<IconLogout size={16} />} fz={"md"}>Log out</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}