import { z } from 'zod';

export const campSchema = z.object({
    title: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(40, { message: 'Name maximum length is 40 characters long' }),
    description: z
        .string()
        .min(10, { message: 'Description must be more than 10 characters long' })
        .max(1000, { message: 'Description maximum length is 1000 characters long' }),
    location: z
        .string()
        .min(2, { message: 'Location must be at least 2 characters long' })
        .max(40),
    price: z
        .number()
        .gt(0, { message: 'Price must be higher than zero' }),
})
