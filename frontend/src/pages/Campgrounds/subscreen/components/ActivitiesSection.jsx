import { Divider, Group, Paper, Text, Title } from "@mantine/core";
import { IconBike, IconFishHook, IconKayak, IconSailboat, IconScubaMask, IconSwimming, IconTrekking } from "@tabler/icons-react";

const activityIcons = {
    "swimming": <IconSwimming />,
    "scuba diving": <IconScubaMask />,
    "fishing": <IconFishHook />,
    "hiking trails": <IconTrekking />,
    "boat rental": <IconSailboat />,
    "canoe/kayak rental": <IconKayak />,
    "bike rental": <IconBike />,
}

export default function ({ activities }) {
    return (
        <>
            {activities &&
                <>
                    <Title order={3} my={15}>Activities</Title>
                    <Group>
                        {activities.map(activity =>
                            <Paper key={activity} shadow='md' p='md' radius='lg' withBorder>
                                <Group>
                                    {activityIcons[activity]}
                                    <Text fz='lg' tt='capitalize'>{activity}</Text>
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