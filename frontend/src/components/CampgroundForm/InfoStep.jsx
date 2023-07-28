import { Container, NumberInput, Text, TextInput, Textarea } from "@mantine/core";
import { IconBlockquote, IconCurrencyDollar, IconMapPin, IconTent } from "@tabler/icons-react";

export default function ({ form }) {
    return (
        <Container size={"sm"}>
            <Text c={"dimmed"}>
                Include all of your campground's information
            </Text>
            <TextInput
                required
                label="Name"
                placeholder="Enter your campground's name"
                mt="md"
                icon={<IconTent size="1rem" />}
                {...form.getInputProps('title')}
            />
            <Textarea
                required
                label="Description"
                placeholder="Tell everyone what's your campground about, and what activities and services you offer"
                autosize
                mt="md"
                icon={<IconBlockquote size="1rem" />}
                {...form.getInputProps('description')}
            />
            <TextInput
                required
                label="Location"
                placeholder="Enter the nearest city to your campground"
                mt="md"
                icon={<IconMapPin size="1rem" />}
                {...form.getInputProps('location')}
            />
            <NumberInput
                required
                label="Price per night (USD)"
                placeholder="Enter your campground's pricing per night"
                mt="md"
                precision={2}
                icon={<IconCurrencyDollar size="1rem" />}
                {...form.getInputProps('price')}
            />
        </Container>
    )
}