import {z} from 'zod';
export const LoginSchema = z.object({
  email: z.string().email(),
});

export type LoginFormData = z.infer<typeof LoginSchema>;
