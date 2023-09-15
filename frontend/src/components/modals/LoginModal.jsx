import { Paper } from "@mantine/core";
import CustomModal from "./CustomModal";
import LoginForm from "../LoginForm";

export default function ({ opened, onClose, onSuccess, preventRedirect, children }) {
    return (
        <CustomModal opened={opened} onClose={onClose}>
            <Paper p={30} radius="md" miw={400}>
                {children}
                <LoginForm
                    preventRedirect={preventRedirect}
                    onSuccess={() => {
                        if (onSuccess) onSuccess();
                        onClose();
                    }}
                    onClose={onClose}
                />
            </Paper>
        </CustomModal>
    )
}