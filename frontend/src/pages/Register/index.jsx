import { Container, Group, Paper } from "@mantine/core";
import RegisterForm from "./components/RegisterForm";

export function Component() {
    return (
        <Container size={"xl"}>
            <Group position="right">
                <Paper withBorder shadow="md" p={30} mt={30} radius="md" miw={400}>
                    <RegisterForm />
                </Paper>
            </Group>
        </Container>
    )
}