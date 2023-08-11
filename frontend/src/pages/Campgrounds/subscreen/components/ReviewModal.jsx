import { Alert, Button, Group, Modal, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import LoginForm from "../../../Login/components/LoginForm";
import ReviewForm from "./ReviewForm";
import useAuth from "../../../../../hooks/useAuth";

export default function () {
    const [opened, { open, close }] = useDisclosure(false);
    const { user } = useAuth();

    return (
        <>
            <Modal opened={opened} onClose={close} title={<Text fw={700}>Submit a review</Text>} radius="md" centered>
                <Paper p={14} radius="md" miw={400}>
                    {user ? (
                        <ReviewForm cancel={close} />
                    ) : (
                        <>
                            <Alert icon={<IconAlertCircle size="1rem" />} title="">
                                You need to log in to submit a review
                            </Alert>
                            <LoginForm preventRedirect />
                        </>
                    )}
                </Paper>
            </Modal>
            <Group my={25}>
                <Button onClick={open}>Submit a review</Button>
            </Group>
        </>
    )
}