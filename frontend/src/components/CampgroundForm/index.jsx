import { Alert, Button, Group, Modal, Paper, Stepper, Text, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconAlertCircle, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { campSchema } from "../../schemas/campSchema";
import { getFormData } from "../../utils/getFormData";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import InfoStep from "./InfoStep";
import ContactStep from "./ContactStep";
import ServicesStep from "./ServicesStep";
import ImagesStep from "./ImagesStep";
import LoginForm from "../LoginForm";
import API from "../../api/axios";
import useAuth from "../../../hooks/useAuth";
import ConfirmModal from "../modals/ConfirmModal";

export default function ({ initialValues, action }) {
    const { user, setUser } = useAuth();
    const [loginModal, handleLoginModal] = useDisclosure(false);
    const [confirmModalOpened, handleConfirmModal] = useDisclosure(false);
    const navigate = useNavigate();
    const [imageFiles, setImageFiles] = useState(initialValues?.images ?? []);
    const [deleteImages, setDeleteImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [active, setActive] = useState(0);

    const lastStep = 3;
    const nextStep = () => {
        if (!form.validate().hasErrors) setActive((current) => (current < lastStep ? current + 1 : current));
    };
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

    const handleSetStep = (step) => {
        if (!form.validate().hasErrors) setActive(step);
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        if (action === 'edit' && (user?.userID !== initialValues?.author?._id)) {
            navigate("/campgrounds");
        }
    }, [])

    useEffect(() => {
        if (loginModal && user) {
            handleLoginModal.close();
        }
    }, [user])

    const form = useForm({
        validateInputOnBlur: true,
        initialValues: initialValues ?? {
            title: '',
            description: '',
            location: '',
            price: 0,
            contact: {
                phone: '',
                email: '',
                includeAccContact: false,
            },
            amenities: [],
            activities: [],
        },
        validate: zodResolver(campSchema),
    });

    const handleSubmit = async (input) => {
        const allowed = [
            'title',
            'description',
            'location',
            'price',
            'contact',
            'amenities',
            'activities',
        ];

        const filtered = Object.keys(input)
            .filter(key => allowed.includes(key))
            .reduce((obj, key) => {
                obj[key] = input[key];
                return obj;
            }, {});

        const formData = getFormData({ campground: filtered })
        if (imageFiles.length === 0) {
            notifications.show({
                title: 'Error',
                message: 'You must upload at least one image of your campground',
                withBorder: true,
                color: 'red',
                icon: <IconX />,
            });
            return
        }
        imageFiles.forEach(img => {
            if (img instanceof File) formData.append("images", img)
        });
        deleteImages?.forEach(img => {
            formData.append("deleteImages[]", img.filename)
        });

        setUploading(true);

        if (initialValues && action === 'edit') {
            await API.put(`/campgrounds/${initialValues.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
                .then(response => {
                    const { campground } = response.data
                    return navigate(`/campgrounds/${campground.id}`);
                })
                .catch(error => {
                    console.error(error);
                    if (error.response.data?.sessionExpired) {
                        setUser(null);
                        handleLoginModal.open();
                    }
                })
                .finally(() => setUploading(false));
        } else {
            await API.post('/campgrounds', formData, { headers: { "Content-Type": "multipart/form-data" } })
                .then(response => {
                    const { campground } = response.data
                    return navigate(`/campgrounds/${campground.id}`);
                })
                .catch(error => {
                    console.error(error);
                    if (error.response.data?.sessionExpired) {
                        setUser(null);
                        handleLoginModal.open();
                    }
                })
                .finally(() => setUploading(false));
        }

    };

    return (
        <>
            <Group position="apart" mb={20}>
                <Title order={3}>
                    {(action === 'edit') ? 'Edit Campground' : 'New Campground'}
                </Title>
                <Button mb={5} variant="light" color="red" leftIcon={<IconX size={"1rem"} />} onClick={handleConfirmModal.open}>
                    Cancel
                </Button>
                <ConfirmModal
                    opened={confirmModalOpened}
                    close={handleConfirmModal.close}
                    confirmProps={{ text: "Exit", onClick: () => (action === 'edit') ? navigate(-1) : navigate('/campgrounds') }}
                >
                    <Text mx={"md"}>Are you sure you want to exit? The changes you made so far will be lost.</Text>
                </ConfirmModal>
            </Group>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stepper size="md" active={active} onStepClick={handleSetStep}>
                    <Stepper.Step label="Information">
                        <InfoStep form={form} />
                    </Stepper.Step>
                    <Stepper.Step label="Contact" >
                        <ContactStep form={form} />
                    </Stepper.Step>
                    <Stepper.Step label="Services" >
                        <ServicesStep form={form} />
                    </Stepper.Step>
                    <Stepper.Step label="Images" >
                        <ImagesStep
                            imageFiles={imageFiles}
                            setImageFiles={setImageFiles}
                            deleteImages={deleteImages}
                            setDeleteImages={setDeleteImages}
                        />
                    </Stepper.Step>
                </Stepper>
                <Group position="center" mt="xl">
                    <Button variant="default" onClick={prevStep} disabled={active === 0}>
                        Previous step
                    </Button>
                    {active === lastStep ? (
                        <Button key="submitBtn" type="submit" color="teal" loading={uploading}>
                            {(action === 'edit') ? 'Save changes' : 'Add campground'}
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