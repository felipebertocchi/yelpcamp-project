import { z } from 'zod';

export const userSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email address' }),
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
