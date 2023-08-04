import { z } from 'zod';

export const userSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name should be at least 2 characters long' })
        .max(40),
    email: z
        .string()
        .email({ message: 'Invalid email address' }),
    phone: z
        .string()
        .refine((i) => i.length > 5, {
            message: "Invalid phone number",
        }),
    password: z
        .string()
        .min(8, { message: 'Password should be at least 8 characters long' }),
    confirmPassword: z
        .string()
        .min(8, { message: 'Password should be at least 8 characters long' }),
    termsOfService: z
        .literal(true, { errorMap: () => ({ message: "You must accept the Terms of Service" }), }),
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords don't match",
    });
