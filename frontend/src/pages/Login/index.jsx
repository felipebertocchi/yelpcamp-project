import { Button, Center, Divider, Group, Paper, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconLock, IconMail } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { z } from 'zod';
import { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";

export function Component() {
    const { user, setUser } = useContext(AuthContext);
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
        await axios.post("http://localhost:4000/login", userInput)
            .then(response => {
                console.log(response.data.message);
                setUser(response.data.user);
                return navigate("/campgrounds");
            })
            .catch(error => {
                console.log(error);
                console.error(error.response.data.error);
                handleFormErrors(error.response.data.error)
            });
    };

    const handleFormErrors = (error) => {
        if (error.includes('Email')) {
            form.setFieldError('email', error)
        } else {
            form.setFieldError('password', error)
        }
    }

    return (
        <Group position="right">
            <Paper withBorder shadow="md" p={30} mt={30} radius="md" miw={400}>
                <Title order={3} my={15}>Log in</Title>
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
                    <Button type="submit" fullWidth size="md" mt="xl">
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
            </Paper>
        </Group>
    )
}