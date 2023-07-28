import CampgroundForm from "../../../components/CampgroundForm";
import { getCampground } from "../../../utils/getCampground";
import { Container, Paper } from "@mantine/core";
import { useLoaderData } from "react-router-dom";

export async function loader({ params }) {
    const campgroundData = await getCampground(params.campgroundId);
    return { ...campgroundData }
}

export function Component() {
    const campgroundValues = useLoaderData();

    return (
        <Container position="center" fluid>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md" miw={800}>
                {campgroundValues && <CampgroundForm initialValues={campgroundValues} action={"edit"} />}
            </Paper>
        </Container>
    )
}