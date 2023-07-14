import { Divider, Group, Text, Title } from "@mantine/core";
import amenityIcons from "../../../utils/amenityIcons";
import activityIcons from "../../../utils/activityIcons";
import ServiceCheckbox from "./ServiceCheckbox";

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
                    <ServiceCheckbox
                        key={amenity}
                        checked={form.values.amenities.includes(amenity)}
                        onClick={handleListChange}
                        list={"amenities"}
                        service={amenity}
                        icon={amenityIcons[amenity]}
                    />
                )}
            </Group>
            <Divider />
            <Title order={4} my={"lg"}>Activities</Title>
            <Group mb={30}>
                {Object.keys(activityIcons).map((activity) =>
                    <ServiceCheckbox
                        key={activity}
                        checked={form.values.activities.includes(activity)}
                        onClick={handleListChange}
                        list={"activities"}
                        service={activity}
                        icon={activityIcons[activity]}
                    />
                )}
            </Group>
        </>
    )
}