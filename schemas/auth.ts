import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: `Password don't match`,
    path: ['passwordConfirmation'],
  });

export type SignInUser = z.infer<typeof signInSchema>;
export type SignUpUser = z.infer<typeof signUpSchema>;
