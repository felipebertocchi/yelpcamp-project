import { useEffect, useState } from "react";
import { Button, Center, Divider, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconLock, IconMail } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from 'zod';
import { AuthService } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

export default function ({ preventRedirect, onSuccess, onClose }) {
    const { user, setUser } = useAuth();
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
        await AuthService.handleLogin(userInput)
            .then(response => {
                setUser(response.user);
                if (onSuccess) onSuccess();
                if (!preventRedirect) return navigate("/campgrounds");
            })
            .catch(error => {
                console.error(error);
                handleFormErrors(error.response.data?.info?.message);
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
            <Title order={3} mb={15}>Login</Title>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    required
                    withAsterisk={false}
                    id="email"
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
                <Link style={{ textDecorationLine: "none" }} to="/register" onClick={onClose}>
                    <Text c="blue">
                        Sign up
                    </Text>
                </Link>
            </Center>
        </>
    )
}