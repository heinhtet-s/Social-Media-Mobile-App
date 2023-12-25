import {z} from 'zod';
export const SignUpSchema = z.object({
  email: z
    .string()
    .email({message: 'Invalid email format'})
    .refine(value => value !== '', {message: 'Email is required'}),
  name: z.string().refine(value => value !== '', {message: 'Name is required'}),
  country: z
    .string()
    .refine(value => value !== '', {message: 'Couintry is required'}),
  referral_code: z.string().nullable(),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;
