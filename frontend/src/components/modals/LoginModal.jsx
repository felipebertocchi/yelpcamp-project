import { Paper } from "@mantine/core";
import CustomModal from "./CustomModal";
import LoginForm from "../LoginForm";

export default function ({ opened, close, preventRedirect, children }) {
    return (
        <CustomModal opened={opened} close={close}>
            <Paper p={30} radius="md" miw={400}>
                {children}
                <LoginForm preventRedirect={preventRedirect} closeModal={close} />
            </Paper>
        </CustomModal>
    )
}