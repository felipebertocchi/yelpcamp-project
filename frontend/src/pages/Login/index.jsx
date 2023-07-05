import { Group, Paper } from "@mantine/core";
import LoginForm from "./components/LoginForm";

export function Component() {

    return (
        <Group position="right">
            <Paper withBorder shadow="md" p={30} mt={30} radius="md" miw={400}>
                <LoginForm />
            </Paper>
        </Group>
    )
}