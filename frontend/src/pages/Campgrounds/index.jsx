import { useEffect, useState } from "react";
import { Box, Container, Group, Pagination, SimpleGrid } from "@mantine/core";
import { useWindowScroll } from '@mantine/hooks';
import { CampCard } from "./components/CampCard";
import { SkeletonCard } from "./components/SkeletonCard";
import API from "../../api/axios";

export function Component() {
    const [activePage, setPage] = useState(1);
    const [pages, setPages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [campgrounds, setCampgrounds] = useState([]);
    const [_, scrollTo] = useWindowScroll();

    useEffect(() => {
        const getCampgrounds = async () => {
            setLoading(true);
            await API.get('/campgrounds', { params: { page: activePage } })
                .then(response => {
                    setCampgrounds(response.data?.campgrounds);
                    setPages(response.data?.pages);
                })
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
        getCampgrounds();
        scrollTo({ y: 0 });
    }, [activePage])

    return (
        <Container size={"xl"} p={30}>
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
                <Pagination.Root total={pages} value={activePage} onChange={(value) => { setPage(value); scrollTo({ y: 0 }) }}>
                    <Group spacing={5} position="center">
                        <Pagination.Previous />
                        <Pagination.Items />
                        <Pagination.Next />
                    </Group>
                </Pagination.Root>
            </Box>
        </Container>
    );
}