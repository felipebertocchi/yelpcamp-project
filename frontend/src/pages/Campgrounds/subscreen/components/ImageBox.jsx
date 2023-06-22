import { Box, Image, Overlay } from "@mantine/core";
import { useHover } from "@mantine/hooks";

export default function (props) {
    const { hovered, ref } = useHover();

    return (
        <Box ref={ref} sx={{ position: 'relative' }} radius="md" style={{ cursor: "pointer" }}>
            <Image {...props} radius="md" withPlaceholder />
            {hovered ? <Overlay opacity={0.1} blur={1} radius="md" /> : <></>}
        </Box>
    )
}