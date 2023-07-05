import { Alert, Button, Group, Modal, Paper, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import { useContext } from "react";
import { AuthContext } from "../../../../auth/AuthContext";
import LoginForm from "../../../Login/components/LoginForm";
import ReviewForm from "./ReviewForm";

export default function () {
    const [opened, { open, close }] = useDisclosure(false);
    const { user } = useContext(AuthContext);

    return (
        <>
            <Modal opened={opened} onClose={close} title={<Title order={5}>Submit a review</Title>} radius="md" centered>
                <Paper p={14} radius="md" miw={400}>
                    {user ? (
                        <ReviewForm cancel={close} />
                    ) : (
                        <>
                            <Alert icon={<IconAlertCircle size="1rem" />} title="">
                                You need to log in to submit a review
                            </Alert>
                            <LoginForm />
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