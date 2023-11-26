import * as z from 'zod';

export const UserSignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const UserSignUpScheme = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: `Password don't match`,
    path: ['passwordConfirmation'],
  });

export type UserSignInData = z.infer<typeof UserSignInSchema>;
export type UserSignUpData = z.infer<typeof UserSignUpScheme>;
