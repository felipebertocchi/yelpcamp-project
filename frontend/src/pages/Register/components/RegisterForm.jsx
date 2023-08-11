import { Anchor, Button, Center, Checkbox, Divider, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconLock, IconMail, IconUser } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { userSchema } from "../../../schemas/userSchema";
import { useEffect } from "react";
import API from "../../../api/axios";
import useAuth from "../../../../hooks/useAuth";

export default function () {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    useEffect(() => {
        if (user) {
            navigate("/campgrounds");
        }
    }, [])

    const form = useForm({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsOfService: false,
        },
        validate: zodResolver(userSchema),
    });

    const handleSubmit = async (userInput) => {
        await API.post('/register', userInput)
            .then(response => {
                setUser(response.data.user);
                return navigate('/campgrounds');
            })
            .catch(error => {
                console.error(error);
                handleFormErrors(error.response.data?.error);
            });
    };

    const handleFormErrors = (error) => {
        form.setFieldError('email', error)
    }

    return (
        <>
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
        </>
    )
}