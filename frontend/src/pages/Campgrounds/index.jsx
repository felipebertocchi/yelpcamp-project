import { SimpleGrid } from "@mantine/core";
import { CGCard } from "./components/Card";
import axios from "axios";
import { useEffect, useState } from "react";

export function Component() {
    const [campgrounds, setCampgrounds] = useState([]);

    useEffect(() => {
        const getCampgrounds = async () => {
            await axios.get('http://localhost:4000/campgrounds')
                .then(response => {
                    setCampgrounds(response.data.campgrounds);
                })
                .catch(err => {
                    console.log(err);
                })
        }
        getCampgrounds();
    }, [])

    return (
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
    );
}