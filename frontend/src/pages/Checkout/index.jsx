import { useEffect } from "react";
import { Container, Grid } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import useCamp from "../../hooks/useCamp";
import TripSummary from "./components/TripSummary";
import PaymentMethod from "./components/PaymentMethod";
import PriceDetailsWidget from "./components/PriceDetailsWidget";

export function Component() {
    const navigate = useNavigate();
    const { campground } = useCamp();

    useEffect(() => {
        if (!campground) navigate('/');
    }, []);

    return (
        <Container size={"xl"} mt={60}>
            {campground && 
                <Grid gutter={55}>
                    <Grid.Col span={7}>
                        <TripSummary />
                        <PaymentMethod />
                    </Grid.Col>
                    <Grid.Col span={5}>
                        <PriceDetailsWidget />
                    </Grid.Col>
                </Grid>
            }
        </Container>
    )
}