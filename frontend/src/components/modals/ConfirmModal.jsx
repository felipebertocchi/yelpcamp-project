import { Button, Group, Text } from "@mantine/core";
import CustomModal from "./CustomModal";

export default function ({ opened, close, confirmProps, cancelProps, children }) {
    return (
        <CustomModal opened={opened} close={close} title={<Text ml={5} fw={700}>Confirm action</Text>}>
            {children}
            <Group position="center" mt="xl">
                <Button variant="default" onClick={close} {...cancelProps}>
                    {cancelProps?.text || "Cancel"}
                </Button>
                <Button {...confirmProps}>
                    {confirmProps?.text || "Confirm"}
                </Button>
            </Group>
        </CustomModal>
    )
}