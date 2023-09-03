import { Alert, Avatar, Box, Button, Divider, Group, Stack, Text, Title } from "@mantine/core";
import dayjs from 'dayjs';
import { IconAlertCircle, IconShieldCheckFilled, IconStarFilled } from '@tabler/icons-react';
import CustomModal from "../../../../components/modals/CustomModal";
import { useDisclosure } from "@mantine/hooks";
import LoginModal from "../../../../components/modals/LoginModal";
import useAuth from "../../../../hooks/useAuth";
import useCamp from "../../../../hooks/useCamp";

export default function () {
    const [loginModalOpened, loginModal] = useDisclosure(false);
    const [contactModalOpened, contactModal] = useDisclosure(false);
    const { user } = useAuth();
    const { campground } = useCamp();
    const { author } = campground;
    const { name, createdAt } = author;

    return (
        <>
            <Divider my='lg' />
            <Box p={15}>
                <Group spacing={15}>
                    <Avatar size={60} color="cyan" radius="xl"></Avatar>
                    <Stack spacing={0}>
                        <Title order={3}>Submitted by {name}</Title>
                        <Text c={"dimmed"}>Joined in {dayjs(createdAt).format("MMMM YYYY")}</Text>
                    </Stack>
                </Group>
                <Group spacing={25} my={20} >
                    <Group spacing={"xs"}>
                        <IconStarFilled size={18} />
                        <Text mt={2} fw={700}>Reviews</Text>
                    </Group>
                    <Group spacing={"xs"}>
                        <IconShieldCheckFilled size={18} />
                        <Text mt={2} fw={700}>Identity verified</Text>
                    </Group>
                </Group>
                <Button variant="default" onClick={user ? contactModal.open : loginModal.open}>Contact</Button>
                <CustomModal opened={contactModalOpened} close={contactModal.close}>
                    <Alert icon={<IconAlertCircle size="1.2rem" />}>
                        To keep every user's data private, we decided not to display their contact information (This is a public web project after all 😇)
                    </Alert>
                </CustomModal>
                <LoginModal opened={loginModalOpened} close={loginModal.close} preventRedirect>
                    <Alert mb={15} icon={<IconAlertCircle size="1.2rem" />}>
                        You need to log in to submit a review
                    </Alert>
                </LoginModal>
            </Box>
        </>
    )
}