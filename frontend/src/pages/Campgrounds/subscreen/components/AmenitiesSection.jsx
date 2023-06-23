import { Divider, Group, Paper, Text, Title } from "@mantine/core";
import { IconAntennaBars5, IconBadgeWc, IconBasket, IconBath, IconCampfire, IconDisabled, IconGrill, IconParking, IconPaw, IconPhoto, IconTrash, IconWashMachine, IconWifi } from "@tabler/icons-react";

const amenityIcons = {
    "wi-fi": <IconWifi />,
    "scenic view": <IconPhoto />,
    "coverage": <IconAntennaBars5 />,
    "restrooms": <IconBadgeWc />,
    "showers": <IconBath />,
    "accessibility": <IconDisabled />,
    "fire ring": <IconCampfire />,
    "grills": <IconGrill />,
    "camp store": <IconBasket />,
    "laundry": <IconWashMachine />,
    "dump station": <IconTrash />,
    "pet-friendly": <IconPaw />,
    "parking": <IconParking />,
}

export default function ({ amenities }) {
    return (
        <>
            {amenities &&
                <>
                    <Title order={3} my={15}>Services & Amenities</Title>
                    <Group>
                        {amenities.map(amenity =>
                            <Paper key={amenity} shadow='md' p='md' radius='lg' withBorder>
                                <Group>
                                    {amenityIcons[amenity]}
                                    <Text fz='lg' tt='capitalize'>{amenity}</Text>
                                </Group>
                            </Paper>
                        )}
                    </Group>
                    <Divider my='lg' />
                </>
            }
        </>
    )
}