import { Paper } from "@mantine/core";
import CustomModal from "./CustomModal";
import LoginForm from "../LoginForm";

export default function ({ opened, close, children }) {
    return (
        <CustomModal opened={opened} close={close}>
            {children}
            <Paper p={30} radius="md" miw={400}>
                <LoginForm closeModal={close} />
            </Paper>
        </CustomModal>
    )
}