import { Card, Group, Skeleton } from '@mantine/core';

export function SkeletonCard() {
    return (
        <Card radius="md" withBorder padding="md">
            <Card.Section>
                <Skeleton height={220} />
            </Card.Section>

            <Skeleton height={18} width={"70%"} mt="lg" />

            <Group position="apart" mt={18}>
                <Skeleton height={12} width={140} />
                <Skeleton height={12} width={50} />
            </Group>

            <Group position="apart" mt="lg">
                <Skeleton height={24} width={75} />
                <Skeleton height={36} width={124} radius="md" />
            </Group>
        </Card>
    );
}