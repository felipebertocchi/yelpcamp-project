import { Button, Center, Divider, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from '@mantine/notifications';
import { IconCheck, IconLock, IconMail, IconX } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from 'zod';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";

export default function ({ preventRedirect }) {
    const { user, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/campgrounds");
        }
    }, [])

    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: zodResolver(
            z.object({
                email: z
                    .string()
                    .email({ message: 'Invalid email address' }),
                password: z
                    .string()
                    .min(8, { message: 'Password should be at least 8 characters long' }),
            })
        ),
    });

    const handleSubmit = async (userInput) => {
        setLoading(true);
        await axios.post("http://localhost:4000/login", userInput)
            .then(response => {
                console.log(response.data.message);
                setUser(response.data.user);
                notifications.show({
                    title: 'Login',
                    message: response.data.message,
                    withBorder: true,
                    color: 'teal',
                    icon: <IconCheck />,
                })
                if (!preventRedirect) return navigate("/campgrounds");
            })
            .catch(error => {
                console.error(error);
                notifications.show({
                    title: 'Login error',
                    message: error.response.data.message,
                    withBorder: true,
                    color: 'red',
                    icon: <IconX />,
                })
                handleFormErrors(error.response.data.error);
            })
            .finally(() => setLoading(false));
    };

    const handleFormErrors = (error) => {
        if (error.includes('Email')) {
            form.setFieldError('email', error)
        } else {
            form.setFieldError('password', error)
        }
    }

    return (
        <>
            <Title order={3} my={15}>Login</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
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
                <Button type="submit" fullWidth size="md" mt="xl" loading={loading}>
                    Login
                </Button>
            </form>
            <Divider my="lg" />
            <Center>
                <Text mr={5}>Don't have an account?</Text>
                <Link style={{ textDecorationLine: "none" }} to="/register">
                    <Text c="blue">
                        Sign up
                    </Text>
                </Link>
            </Center>
        </>
    )
}