import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(3).max(60),
    lastName: z.string().min(3).max(60),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password'],
    message: 'Password and Password confirmation does not match',
  });
