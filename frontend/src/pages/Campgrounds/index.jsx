import { useEffect, useState } from "react";
import { Box, Group, Pagination, SimpleGrid } from "@mantine/core";
import { CGCard } from "./components/Card";
import axios from "axios";

export function Component() {
    const [activePage, setPage] = useState(1);
    const [pages, setPages] = useState(null);
    const [campgrounds, setCampgrounds] = useState([]);

    useEffect(() => {
        const getCampgrounds = async () => {
            await axios.get('http://localhost:4000/campgrounds', {
                params: { page: activePage }
            })
                .then(response => {
                    setCampgrounds(response.data.campgrounds);
                    setPages(response.data.pages);
                })
                .catch(err => {
                    console.log(err);
                })
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
                {(campgrounds.length > 0) && campgrounds.map((cg) =>
                    <CGCard key={cg.id} {...cg} />
                )}
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