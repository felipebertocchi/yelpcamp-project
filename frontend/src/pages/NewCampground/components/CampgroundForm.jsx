import { ActionIcon, Alert, Box, Button, Checkbox, Divider, Group, Image, Modal, NumberInput, Paper, SimpleGrid, Stepper, Text, TextInput, Textarea, Title, Tooltip, rem } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconAlertCircle, IconAt, IconBlockquote, IconCurrencyDollar, IconMapPin, IconPhone, IconPhoto, IconTent, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { campSchema } from "../../../schemas/campSchema";
import amenityIcons from "../../../utils/amenityIcons";
import activityIcons from "../../../utils/activityIcons";
import { getFormData } from "../../../utils/getFormData";
import LoginForm from "../../Login/components/LoginForm";
import { useDisclosure } from "@mantine/hooks";

export default function () {
    const { user, setUser } = useContext(AuthContext);
    const [loginModal, handleLoginModal] = useDisclosure(false);
    const navigate = useNavigate();
    const [imageFiles, setImageFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [active, setActive] = useState(0);

    const lastStep = 3;
    const nextStep = () => {
        if (!form.validate().hasErrors) setActive((current) => (current < lastStep ? current + 1 : current))
    };
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [])

    useEffect(() => {
        if (loginModal && user) {
            handleLoginModal.close();
        }
    }, [user])

    const form = useForm({
        validateInputOnBlur: true,
        initialValues: {
            title: '',
            description: '',
            location: '',
            price: 0,
            contact: {
                phone: '',
                email: '',
                includeAccContact: false,
            },
            amenities: Object.keys(amenityIcons).map(amenity => { return { name: amenity, active: false } }),
            activities: Object.keys(activityIcons).map(activity => { return { name: activity, active: false } }),
        },
        validate: zodResolver(campSchema),
    });

    const handleSubmit = async (input) => {
        const formData = getFormData({ campground: input })
        imageFiles.forEach(img => {
            formData.append("images", img)
        })

        setUploading(true);

        await axios.post("http://localhost:4000/campgrounds", formData, { headers: { "Content-Type": "multipart/form-data", } })
            .then(response => {
                console.log(response.data.message);
                const { campground } = response.data
                return navigate(`/campgrounds/${campground.id}`);
            })
            .catch(error => {
                console.log(error.response.data.message);
                if (error.response.data.sessionExpired) {
                    setUser(null);
                    handleLoginModal.open();
                }
            })
            .finally(() => setUploading(false));
    };

    const deleteImage = (index) => {
        const newImageFiles = [...imageFiles];
        newImageFiles.splice(index, 1);
        setImageFiles(newImageFiles);
    };

    const previews = imageFiles.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Box pos="relative" key={index}>
                <Image
                    src={imageUrl}
                    imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
                />
                <Tooltip label="Remove image" position="left">
                    <ActionIcon
                        color="red"
                        radius="xl"
                        pos="absolute"
                        top="3%"
                        right="2%"
                        onClick={() => deleteImage(index)}
                    >
                        <IconTrash size="1.125rem" />
                    </ActionIcon>
                </Tooltip>
            </Box>
        );
    });

    return (
        <>
            <Title order={3} my={15}>New Campground</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stepper size="md" active={active}>
                    <Stepper.Step label="Information">
                        <Text c={"dimmed"}>
                            Include all of your campground's information
                        </Text>
                        <TextInput
                            required
                            label="Name"
                            placeholder="Enter your campground's name"
                            mt="md"
                            icon={<IconTent size="1rem" />}
                            {...form.getInputProps('title')}
                        />
                        <Textarea
                            required
                            label="Description"
                            placeholder="Tell everyone what's your campground about, and what activities and services you offer"
                            autosize
                            mt="md"
                            icon={<IconBlockquote size="1rem" />}
                            {...form.getInputProps('description')}
                        />
                        <TextInput
                            required
                            label="Location"
                            placeholder="Enter the nearest city to your campground"
                            mt="md"
                            icon={<IconMapPin size="1rem" />}
                            {...form.getInputProps('location')}
                        />
                        <NumberInput
                            required
                            label="Price per night (USD)"
                            placeholder="Enter your campground's pricing per night"
                            mt="md"
                            precision={2}
                            icon={<IconCurrencyDollar size="1rem" />}
                            {...form.getInputProps('price')}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Contact" >
                        <Text c={"dimmed"}>
                            Give people a means of communicating with your campground. You can also provide your account's contact information
                        </Text>
                        <TextInput
                            label="Phone (Optional)"
                            placeholder="Enter your campground's phone number"
                            mt="md"
                            icon={<IconPhone size="1rem" />}
                            {...form.getInputProps('contact.phone')}
                        />
                        <TextInput
                            label="Email (Optional)"
                            placeholder="Enter your campground's email"
                            mt="md"
                            icon={<IconAt size="1rem" />}
                            {...form.getInputProps('contact.email')}
                        />
                        <Checkbox
                            mt="md"
                            label={"Include my YelpCamp account contact information"}
                            {...form.getInputProps('contact.includeAccContact', { type: 'checkbox' })}
                        />
                    </Stepper.Step>
                    <Stepper.Step label="Services & Amenities" >
                        <Text c={"dimmed"}>
                            Select all amenities and activities that your campground can offer
                        </Text>
                        <Title order={4} my={"lg"}>Amenities</Title>
                        <Group mb={30}>
                            {Object.keys(amenityIcons).map((amenity, index) =>
                                <Paper key={amenity} shadow='sm' p='sm' radius='lg' withBorder>
                                    <Group>
                                        {amenityIcons[amenity]}
                                        <Text fz='lg' tt='capitalize'>{amenity}</Text>
                                        <Checkbox
                                            tabIndex={-1}
                                            size="md"
                                            styles={{ input: { cursor: 'pointer' } }}
                                            {...form.getInputProps(`amenities.${index}.active`, { type: 'checkbox' })}
                                        />
                                    </Group>
                                </Paper>
                            )}
                        </Group>
                        <Divider />
                        <Title order={4} my={"lg"}>Activities</Title>
                        <Group mb={30}>
                            {Object.keys(activityIcons).map((activity, index) =>
                                <Paper key={activity} shadow='sm' p='sm' radius='lg' withBorder>
                                    <Group>
                                        {activityIcons[activity]}
                                        <Text fz='lg' tt='capitalize'>{activity}</Text>
                                        <Checkbox
                                            tabIndex={-1}
                                            size="md"
                                            styles={{ input: { cursor: 'pointer' } }}
                                            {...form.getInputProps(`activities.${index}.active`, { type: 'checkbox' })}
                                        />
                                    </Group>
                                </Paper>
                            )}
                        </Group>
                    </Stepper.Step>
                    <Stepper.Step label="Images" >
                        <Text c={"dimmed"}>
                            Upload pictures to show guests your campground
                        </Text>
                        <Dropzone
                            onDrop={(files) => setImageFiles([...imageFiles, ...files])}
                            onReject={(files) => console.log('rejected files', files)}
                            maxSize={3 * 1024 ** 2}
                            accept={IMAGE_MIME_TYPE}
                            my={"lg"}
                        >
                            <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                                <Dropzone.Accept>
                                    <IconUpload size="3.2rem" stroke={1.5} />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX size="3.2rem" stroke={1.5} />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconPhoto size="3.2rem" stroke={1.5} />
                                </Dropzone.Idle>
                                <div>
                                    <Text size="xl" inline>
                                        Drag images here or click to select files
                                    </Text>
                                    <Text size="sm" color="dimmed" inline mt={7}>
                                        Attach as many files as you like, each file should not exceed 5mb
                                    </Text>
                                </div>
                            </Group>
                        </Dropzone>
                        <SimpleGrid
                            cols={4}
                            breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                            mt={previews.length > 0 ? 'xl' : 0}
                        >
                            {previews}
                        </SimpleGrid>
                    </Stepper.Step>
                </Stepper>
                <Group position="center" mt="xl">
                    <Button variant="default" onClick={prevStep} disabled={active === 0}>
                        Back
                    </Button>
                    {active === lastStep ? (
                        <Button key="submitBtn" type="submit" color="teal" loading={uploading}>
                            Add campground
                        </Button>
                    ) : (
                        <Button onClick={nextStep}>
                            Next step
                        </Button>
                    )}
                </Group>
            </form>
            <Modal opened={loginModal} onClose={handleLoginModal.close} title="Action requires login" centered>
                <Paper p={14} radius="md" miw={400}>
                    <Alert icon={<IconAlertCircle />} color="yellow">
                        Your session has expired! Log in to continue
                    </Alert>
                    <LoginForm preventRedirect />
                </Paper>
            </Modal>
        </>
    )
}