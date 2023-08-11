import { Button, Flex, Modal, Paper, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import API from "../../../../api/axios";

export default function ({ opened, close, campgroundId }) {
    const navigate = useNavigate();

    const deleteCampground = async () => {
        await API.delete(`/campgrounds/${campgroundId}`)
            .then(() => {
                navigate('/campgrounds')
            })
            .catch(err => {
                console.error(err);
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