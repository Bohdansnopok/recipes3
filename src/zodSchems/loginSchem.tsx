import { z } from "zod";
import { EmailPattern } from '../patterns/pattern';

export const loginSchema = z.object({
    email: z
    .string()
        .min(1, { message: 'Email is required' })
        .refine((text) => EmailPattern.test(text), {
            message: 'Email not valid',
        }),
    singIn: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    createdAt: z.date(),
    isVerified: z.boolean().default(false),
    variant: z.literal("signIn")
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
