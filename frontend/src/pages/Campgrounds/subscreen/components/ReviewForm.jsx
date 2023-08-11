import { Button, Group, Input, LoadingOverlay, Rating, Textarea } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../../api/axios";

export default function ({ cancel }) {
    const { campgroundId } = useParams();
    const [visible, { toggle }] = useDisclosure(false);
    const navigate = useNavigate();

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
        toggle();
        await API.post(`/campgrounds/${campgroundId}/reviews`, { review })
            .then(() => {
                navigate(0);
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
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
                <Button type="button" onClick={cancel} variant="outline">Cancel</Button>
                <Button type="submit" disabled={!form.isDirty('rating') || !form.isDirty('body')}>Submit review</Button>
            </Group>
            <LoadingOverlay visible={visible} overlayBlur={2} />
        </form>
    )
}