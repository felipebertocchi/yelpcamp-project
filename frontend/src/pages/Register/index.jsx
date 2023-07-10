import { Anchor, Button, Center, Checkbox, Divider, Group, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconCheck, IconLock, IconMail, IconPhone, IconUser, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { userSchema } from "../../schemas/userSchema";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import axios from "axios";
import { notifications } from "@mantine/notifications";


export function Component() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            navigate("/campgrounds");
        }
    }, [])

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            termsOfService: false,
        },
        validate: zodResolver(userSchema),
    });

    const handleSubmit = async (userInput) => {
        await axios.post("http://localhost:4000/register", userInput)
            .then(response => {
                notifications.show({
                    title: 'Register succesful',
                    message: response.data.message,
                    withBorder: true,
                    color: 'teal',
                    icon: <IconCheck />,
                })
                setUser(response.data.user);
                return navigate("/campgrounds");
            })
            .catch(error => {
                console.error(error);
                notifications.show({
                    title: 'Error',
                    message: error.response.data?.message,
                    withBorder: true,
                    color: 'red',
                    icon: <IconX />,
                });
                handleFormErrors(error.response.data?.error)
            });
    };

    const handleFormErrors = (error) => {
        form.setFieldError('email', error)
    }

    return (
        <Group position="right">
            <Paper withBorder shadow="md" p={30} mt={30} radius="md" miw={400}>
                <Title order={3} my={15}>Register</Title>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <TextInput
                        required
                        withAsterisk={false}
                        label="Name"
                        placeholder="Enter your legal name or company name"
                        mt="md"
                        icon={<IconUser size="1rem" />}
                        {...form.getInputProps('name')}
                    />
                    <TextInput
                        required
                        withAsterisk={false}
                        label="Email"
                        placeholder="Enter your email"
                        mt="md"
                        icon={<IconMail size="1rem" />}
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        label="Phone number"
                        placeholder="Enter your phone number"
                        mt="md"
                        icon={<IconPhone size="1rem" />}
                        {...form.getInputProps('phone')}
                    />
                    <PasswordInput
                        required
                        withAsterisk={false}
                        label="Password"
                        placeholder="Enter your password"
                        mt="md"
                        icon={<IconLock size="1rem" />}
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        required
                        withAsterisk={false}
                        label="Confirm Password"
                        placeholder="Enter your password"
                        mt="md"
                        icon={<IconLock size="1rem" />}
                        {...form.getInputProps('confirmPassword')}
                    />
                    <Checkbox
                        mt="md"
                        label={<>I agree to YelpCamp's <Anchor href="https://placeholder.com/terms" target="_blank">Terms of Service</Anchor></>}
                        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
                    />
                    <Button type="submit" fullWidth size="md" mt="xl" color="teal">
                        Sign up
                    </Button>
                </form>
                <Divider my="lg" />
                <Center>
                    <Text mr={5}>Already have an account?</Text>
                    <Link style={{ textDecorationLine: "none" }} to="/login">
                        <Text c="blue">
                            Log in
                        </Text>
                    </Link>
                </Center>
            </Paper>
        </Group>
    )
}