import { Button, Flex, Modal, Paper, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconTrash, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ({ opened, close, campgroundId }) {
    const navigate = useNavigate();

    const deleteCampground = async () => {
        await axios.delete(`${import.meta.env.VITE_BACKEND_DOMAIN}/campgrounds/${campgroundId}`)
            .then(response => {
                notifications.show({
                    title: 'Campground deleted',
                    message: response.data?.message,
                    withBorder: true,
                    color: 'teal',
                    icon: <IconCheck />,
                });
                navigate('/campgrounds')
            })
            .catch(err => {
                console.error(err);
                notifications.show({
                    title: 'Error',
                    message: err.response.data?.message,
                    withBorder: true,
                    color: 'red',
                    icon: <IconX />,
                });
            })
    }

    return (
        <Modal opened={opened} onClose={close} title={<Text fw={700}>Confirm campground deletion</Text>} centered>
            <Paper px={14} py={6}>
                <Text>Are you sure you want to delete your campground?</Text>
                <Flex justify={"space-evenly"} mt={20}>
                    <Button onClick={close} variant="default">
                        Cancel
                    </Button>
                    <Button onClick={deleteCampground} color="red" leftIcon={<IconTrash size={'1.2rem'} />}>
                        Delete campground
                    </Button>
                </Flex>
            </Paper>
        </Modal>
    )
}