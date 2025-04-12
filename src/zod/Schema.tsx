// import { z } from "zod";
// import { EmailPattern } from '../patterns/pattern';

// export const loginSchema = z.object({
//     email: z
//     .string()
//         .min(1, { message: 'Email is required' })
//         .refine((text) => EmailPattern.test(text), {
//             message: 'Email not valid',
//         }),
//     password: z.string().min(8, 'Password must be at least 8 characters'),
//     createdAt: z.date(),
//     isVerified: z.boolean().default(false),
//     variant: z.literal("signIn")
// });

// export type LoginSchemaType = z.infer<typeof loginSchema>;

import { z } from "zod";
import { EmailPattern } from '../patterns/pattern';


export const signUpSchema = z.object({
    username: z.string().min(1, { message: 'Required' }),
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .refine((text) => EmailPattern.test(text), {
            message: 'Email not valid',
        }),
    password: z.string().min(6, { message: 'Password should be at least 6 characters' }),
    variant: z.literal('signUp')
});


export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .refine((text) => EmailPattern.test(text), {
            message: 'Email not valid',
        }),
    password: z.string().min(6, { message: 'Password should be at least 6 characters' }),
    variant: z.literal("signIn")
});


export type SignUpSchemaType = z.infer<typeof signUpSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;

