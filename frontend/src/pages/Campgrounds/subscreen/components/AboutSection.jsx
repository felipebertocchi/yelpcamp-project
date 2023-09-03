import { Text, Title } from "@mantine/core";
import useCamp from "../../../../hooks/useCamp";

export default function () {
    const { campground } = useCamp();
    const { title, description } = campground;

    return (
        <>
            <Title my={30}>{title}</Title>
            <Title order={3} my={15}>About this campground</Title>
            <Text fz='lg'>{description}</Text>
        </>
    )
}