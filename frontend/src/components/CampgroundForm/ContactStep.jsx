import { Checkbox, Container, Text, TextInput } from "@mantine/core";
import { IconAt, IconPhone } from "@tabler/icons-react";

export default function ({ form }) {
    return (
        <Container size={"sm"}>
            <Text c={"dimmed"}>
                Give people a means of communicating with your campground. You can also provide your account's contact information
            </Text>
            <TextInput
                label="Phone (Optional)"
                placeholder="Enter your campground's phone number"
                mt="md"
                icon={<IconPhone size="1rem" />}
                {...form.getInputProps('contact.phone')}
            />
            <TextInput
                label="Email (Optional)"
                placeholder="Enter your campground's email"
                mt="md"
                icon={<IconAt size="1rem" />}
                {...form.getInputProps('contact.email')}
            />
            <Checkbox
                mt="md"
                label={"Include my YelpCamp account contact information"}
                {...form.getInputProps('contact.includeAccContact', { type: 'checkbox' })}
            />
        </Container>
    )
}