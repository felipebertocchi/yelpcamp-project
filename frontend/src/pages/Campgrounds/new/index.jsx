import CampgroundForm from "../../../components/CampgroundForm";
import { Container, Paper } from "@mantine/core";

export function Component() {

    return (
        <Container position="center" size={"xl"}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md" miw={800}>
                <CampgroundForm />
            </Paper>
        </Container>
    )
}