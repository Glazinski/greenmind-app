import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';

import { AuthForm } from 'components/auth-form';
import { useSignUp } from 'services/auth/mutations';
import { signUpSchema, SignUpUser } from 'schemas/auth';

export const SignUpScreen = (): React.JSX.Element => {
  const { mutate, error, isLoading } = useSignUp();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpUser>({
    defaultValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: SignUpUser) => mutate(data);

  return (
    <AuthForm
      type="signUp"
      handleSubmit={handleSubmit(onSubmit)}
      control={control}
      apiError={
        error instanceof AxiosError
          ? (error.response?.data?.errors?.[0] as string)
          : ''
      }
      errors={errors}
      isLoading={isLoading}
    />
  );
};
