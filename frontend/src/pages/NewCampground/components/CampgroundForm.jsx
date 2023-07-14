import { Alert, Button, Group, Modal, Paper, Stepper, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconAlertCircle, IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import { campSchema } from "../../../schemas/campSchema";
import { getFormData } from "../../../utils/getFormData";
import LoginForm from "../../Login/components/LoginForm";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import InfoStep from "./InfoStep";
import ContactStep from "./ContactStep";
import ServicesStep from "./ServicesStep";
import ImagesStep from "./ImagesStep";

export default function () {
    const { user, setUser } = useContext(AuthContext);
    const [loginModal, handleLoginModal] = useDisclosure(false);
    const navigate = useNavigate();
    const [imageFiles, setImageFiles] = useState([]);
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
            amenities: [],
            activities: [],
        },
        validate: zodResolver(campSchema),
    });

    const handleSubmit = async (input) => {
        const formData = getFormData({ campground: input })
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
            formData.append("images", img)
        })

        setUploading(true);

        await axios.post(`${import.meta.env.VITE_BACKEND_DOMAIN}/campgrounds`, formData, { headers: { "Content-Type": "multipart/form-data", } })
            .then(response => {
                const { campground } = response.data
                notifications.show({
                    title: 'Campground added',
                    message: response.data.message,
                    withBorder: true,
                    color: 'teal',
                    icon: <IconCheck />,
                });
                return navigate(`/campgrounds/${campground.id}`);
            })
            .catch(error => {
                console.error(error);
                notifications.show({
                    title: error.response.data?.title || 'Error',
                    message: error.response.data?.message,
                    withBorder: true,
                    color: 'red',
                    icon: <IconX />,
                });
                if (error.response.data?.sessionExpired) {
                    setUser(null);
                    handleLoginModal.open();
                }
            })
            .finally(() => setUploading(false));
    };

    return (
        <>
            <Title order={3} my={15}>New Campground</Title>
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
                        <ImagesStep imageFiles={imageFiles} setImageFiles={setImageFiles} />
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