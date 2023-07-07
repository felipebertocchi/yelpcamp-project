import { Container, Paper } from "@mantine/core";
import CampgroundForm from "./components/CampgroundForm";

export function Component() {

    return (
        <Container position="center" fluid>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md" miw={800}>
                <CampgroundForm />
            </Paper>
        </Container>
    )
}