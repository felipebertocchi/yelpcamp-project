import { Alert, Button, Group, Input, LoadingOverlay, Modal, Paper, Rating, Textarea, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from '@mantine/form';
import { IconAlertCircle } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../../auth/AuthContext";
import LoginForm from "../../../Login/components/LoginForm";

export default function ({ campgroundId }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [visible, { toggle }] = useDisclosure(false);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const form = useForm({
        initialValues: {
            rating: 0,
            body: '',
        },

        validate: {
            rating: (value) => (value === 0 ? 'Rating is required' : null),
            body: (value) => (value.length < 10 ? 'Review body must be at least 10 characters long' : null),
        },
    });

    const postReview = async (review) => {
        await axios.post(`http://localhost:4000/campgrounds/${campgroundId}/reviews`, { review })
            .then(() => {
                navigate(0);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title={<Title order={5}>Submit a review</Title>} radius="md" centered>
                <Paper p={14} radius="md" miw={400}>
                    {user ? (
                        <form onSubmit={form.onSubmit(postReview)}>
                            <Group position="center">
                                <Input.Wrapper size="md" {...form.getInputProps('rating')}>
                                    <Rating
                                        m={5}
                                        size="xl"
                                        {...form.getInputProps('rating')}
                                    />
                                </Input.Wrapper>
                            </Group>
                            <Textarea
                                my={20}
                                size="md"
                                placeholder="Share your experience in this campground"
                                {...form.getInputProps('body')}
                            />
                            <Group position="right" mt="md">
                                <Button type="button" onClick={close} variant="outline">Cancel</Button>
                                <Button type="submit" onClick={toggle} disabled={!form.isDirty('rating') || !form.isDirty('body')}>Submit review</Button>
                            </Group>
                        </form>
                    ) : (
                        <>
                            <Alert icon={<IconAlertCircle size="1rem" />} title="">
                                You need to log in to submit a review
                            </Alert>
                            <LoginForm />
                        </>
                    )}
                    <LoadingOverlay visible={visible} overlayBlur={2} />
                </Paper>
            </Modal>
            <Group my={25}>
                <Button onClick={open}>Submit a review</Button>
            </Group>
        </>
    )
}