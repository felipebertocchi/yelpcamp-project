import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ActionIcon, Button, Group, Menu, Text } from "@mantine/core";
import { IconChevronDown, IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmModal from "../../../../components/modals/ConfirmModal";
import API from "../../../../api/axios";

export default function () {
    const { campgroundId } = useParams();
    const [deleteModalOpened, deleteModal] = useDisclosure(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const deleteCampground = async () => {
        setLoading(true);
        await API.delete(`/campgrounds/${campgroundId}`)
            .then(() => {
                navigate('/campgrounds')
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }

    return (
        <Group position="right" noWrap spacing={0}>
            <Button
                leftIcon={<IconPencil size={"1.2rem"} />}
                variant="default"
                style={{
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                }}
                onClick={() => navigate('edit')}
            >
                Edit
            </Button>
            <Menu transitionProps={{ transition: 'pop' }} position="bottom-end" withinPortal>
                <Menu.Target>
                    <ActionIcon
                        variant="default"
                        size={36}
                        style={{
                            borderTopLeftRadius: 0,
                            borderBottomLeftRadius: 0,
                            borderLeft: 0
                        }}
                    >
                        <IconChevronDown size="1rem" stroke={1.5} />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item
                        onClick={deleteModal.open}
                        icon={<IconTrash size="1rem" stroke={1.5} />}
                        color="red"
                    >
                        Delete
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <ConfirmModal
                opened={deleteModalOpened}
                close={deleteModal.close}
                confirmProps={{
                    text: "Delete",
                    color: "red",
                    leftIcon: <IconTrash size={'1.2rem'} />,
                    loading,
                    onClick: deleteCampground
                }}
            >
                <Text mx={"md"}>Are you sure you want to delete your campground?</Text>
            </ConfirmModal>
        </Group>
    )
}