import { Alert, Button, Group } from "@mantine/core";
import { IconAlertCircle } from '@tabler/icons-react';
import LoginModal from "../../../../components/modals/LoginModal";
import useAuth from "../../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";

export default function ({ nights, scrollToCalendar }) {
    const [loginModalOpened, loginModal] = useDisclosure(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleCheckout = () => {
        navigate('/checkout');
    }

    return (
        <>
            <Group>
                {nights ? (
                    <Button radius={"md"} color="teal" fullWidth size="lg" onClick={user ? handleCheckout : loginModal.open} >
                        Reserve
                    </Button>
                ) : (
                    <Button radius={"md"} fullWidth size="lg" onClick={scrollToCalendar}>
                        Check availability
                    </Button>
                )}
            </Group>
            <LoginModal opened={loginModalOpened} close={loginModal.close} onSuccess={handleCheckout} preventRedirect>
                <Alert mb={15} icon={<IconAlertCircle size="1.2rem" />}>
                    You need to log in to book a stay
                </Alert>
            </LoginModal>
        </>
    )
}