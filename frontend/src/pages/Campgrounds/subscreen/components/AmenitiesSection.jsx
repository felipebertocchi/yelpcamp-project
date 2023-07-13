import { Divider, Group, Paper, Text, Title } from "@mantine/core";
import amenityIcons from "../../../../utils/amenityIcons";

export default function ({ amenities }) {
    return (
        <>
            {amenities &&
                <>
                    <Divider my='lg' />
                    <Title order={3} my={15}>Services & Amenities</Title>
                    <Group>
                        {amenities.map(amenity =>
                            <Paper key={amenity} shadow='md' p='sm' radius='lg' withBorder>
                                <Group>
                                    {amenityIcons[amenity]}
                                    <Text fz='lg' tt='capitalize'>{amenity}</Text>
                                </Group>
                            </Paper>
                        )}
                    </Group>
                </>
            }
        </>
    )
}