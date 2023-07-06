import { Divider, Group, Paper, Text, Title } from "@mantine/core";
import activityIcons from "../../../../utils/activityIcons";

export default function ({ activities }) {
    return (
        <>
            {activities &&
                <>
                    <Divider my='lg' />
                    <Title order={3} my={15}>Activities</Title>
                    <Group>
                        {activities.filter(a => a.active).map(activity =>
                            <Paper key={activity.name} shadow='md' p='sm' radius='lg' withBorder>
                                <Group>
                                    {activityIcons[activity.name]}
                                    <Text fz='lg' tt='capitalize'>{activity.name}</Text>
                                </Group>
                            </Paper>
                        )}
                    </Group>
                </>
            }
        </>
    )
}