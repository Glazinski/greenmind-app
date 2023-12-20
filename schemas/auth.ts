import * as z from 'zod';

import i18n from 'lib/i18n';

const PasswordSchema = z
  .string()
  .min(8, { message: i18n.t('password_error') as string });

const EmailSchema = z
  .string()
  .email({ message: i18n.t('email_error') as string });

export const UserSignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const UserSignUpScheme = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    passwordConfirmation: PasswordSchema,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: i18n.t('password_match_error') as string,
    path: ['passwordConfirmation'],
  });

export type UserSignInData = z.infer<typeof UserSignInSchema>;
export type UserSignUpData = z.infer<typeof UserSignUpScheme>;
