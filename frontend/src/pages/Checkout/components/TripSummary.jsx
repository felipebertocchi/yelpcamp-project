import { Text, Title } from "@mantine/core";
import useCamp from "../../../hooks/useCamp";

export default function () {
    const { campground, checkoutDetails } = useCamp();
    const { checkInDate, checkOutDate } = checkoutDetails;

    return (
        <>
            <Title mb="lg">
                Book your stay at {campground?.title}
            </Title>
            <Title order={3}>
                Dates
            </Title>
            <Text>
                {checkInDate.format("MMM DD")} - {checkOutDate.format("MMM DD")}
            </Text>
        </>
    )
}