import { Checkbox, Divider, Group, Paper, Text, Title, UnstyledButton } from "@mantine/core";
import amenityIcons from "../../../utils/amenityIcons";
import activityIcons from "../../../utils/activityIcons";

export default function ({ form }) {

    const handleListChange = (list, value) => {
        if (!form.values[list].includes(value)) {
            form.insertListItem(list, value)
        } else {
            form.removeListItem(list, form.values[list].indexOf(value))
        }
    }

    return (
        <>
            <Text c={"dimmed"}>
                Select all amenities and activities that your campground can offer
            </Text>
            <Title order={4} my={"lg"}>Amenities</Title>
            <Group mb={30}>
                {Object.keys(amenityIcons).map((amenity) =>
                    <UnstyledButton key={amenity} onClick={() => handleListChange("amenities", amenity)}>
                        <Paper shadow='sm' p='sm' radius='lg' withBorder>
                            <Group>
                                {amenityIcons[amenity]}
                                <Text fz='lg' tt='capitalize'>{amenity}</Text>
                                <Checkbox
                                    size="md"
                                    checked={form.values.amenities.includes(amenity)}
                                    styles={{ input: { cursor: 'pointer' } }}
                                    onChange={() => null}
                                />
                            </Group>
                        </Paper>
                    </UnstyledButton>
                )}
            </Group>
            <Divider />
            <Title order={4} my={"lg"}>Activities</Title>
            <Group mb={30}>
                {Object.keys(activityIcons).map((activity) =>
                    <UnstyledButton key={activity} onClick={() => handleListChange("activities", activity)}>
                        <Paper shadow='sm' p='sm' radius='lg' withBorder>
                            <Group>
                                {activityIcons[activity]}
                                <Text fz='lg' tt='capitalize'>{activity}</Text>
                                <Checkbox
                                    size="md"
                                    styles={{ input: { cursor: 'pointer' } }}
                                    checked={form.values.activities.includes(activity)}
                                    onChange={() => null}
                                />
                            </Group>
                        </Paper>
                    </UnstyledButton>
                )}
            </Group>
        </>
    )
}