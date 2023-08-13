import { Alert, Button, Group, Paper, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import ReviewForm from "./ReviewForm";
import useAuth from "../../../../../hooks/useAuth";
import LoginModal from "../../../../components/modals/LoginModal";
import CustomModal from "../../../../components/modals/CustomModal";

export default function () {
    const [reviewModalOpened, reviewModal] = useDisclosure(false);
    const [loginModalOpened, loginModal] = useDisclosure(false);
    const { user } = useAuth();

    return (
        <>
            <CustomModal opened={reviewModalOpened} close={reviewModal.close} title={<Text fw={700}>Submit a review</Text>}>
                <Paper p={14} radius="md" miw={400}>
                    <ReviewForm cancel={reviewModal.close} />
                </Paper>
            </CustomModal>
            <LoginModal opened={loginModalOpened} close={loginModal.close} onSuccess={reviewModal.open} preventRedirect>
                <Alert mb={15} icon={<IconAlertCircle size="1.2rem" />}>
                    You need to log in to submit a review
                </Alert>
            </LoginModal>
            <Group my={25}>
                <Button onClick={user ? reviewModal.open : loginModal.open}>
                    Submit a review
                </Button>
            </Group>
        </>
    )
}