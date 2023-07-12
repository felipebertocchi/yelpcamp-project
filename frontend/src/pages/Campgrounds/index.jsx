import { useEffect, useState } from "react";
import { Box, Group, Pagination, SimpleGrid } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { CampCard } from "./components/CampCard";
import axios from "axios";
import { IconX } from "@tabler/icons-react";
import { SkeletonCard } from "./components/SkeletonCard";

export function Component() {
    const [activePage, setPage] = useState(1);
    const [pages, setPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [campgrounds, setCampgrounds] = useState([]);

    useEffect(() => {
        const getCampgrounds = async () => {
            setLoading(true);
            await axios.get('http://localhost:4000/campgrounds', {
                params: { page: activePage }
            })
                .then(response => {
                    setCampgrounds(response.data?.campgrounds);
                    setPages(response.data?.pages);
                })
                .catch(err => {
                    notifications.show({
                        title: 'Error',
                        message: err.response.data?.message,
                        withBorder: true,
                        color: 'red',
                        icon: <IconX />,
                    });
                    console.error(err);
                })
                .finally(() => setLoading(false));
        }
        getCampgrounds();
    }, [activePage])

    return (
        <>
            <SimpleGrid
                cols={4}
                spacing="lg"
                breakpoints={[
                    { maxWidth: '62rem', cols: 3, spacing: 'md' },
                    { maxWidth: '48rem', cols: 2, spacing: 'sm' },
                    { maxWidth: '36rem', cols: 1, spacing: 'sm' },
                ]}
            >
                {(!loading && campgrounds.length > 0) ? campgrounds.map((cg, index) =>
                    <CampCard key={cg.id} {...cg} />
                ) : (
                    [...Array(12).keys()]
                        .map((_, index) =>
                            <SkeletonCard key={index} />
                        ))}
            </SimpleGrid>
            <Box mt="xl">
                <Pagination.Root total={pages} value={activePage} onChange={setPage}>
                    <Group spacing={5} position="center">
                        <Pagination.Previous />
                        <Pagination.Items />
                        <Pagination.Next />
                    </Group>
                </Pagination.Root>
            </Box>
        </>
    );
}