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
                        {amenities.filter(a => a.active).map(amenity =>
                            <Paper key={amenity.name} shadow='md' p='sm' radius='lg' withBorder>
                                <Group>
                                    {amenityIcons[amenity.name]}
                                    <Text fz='lg' tt='capitalize'>{amenity.name}</Text>
                                </Group>
                            </Paper>
                        )}
                    </Group>
                </>
            }
        </>
    )
}