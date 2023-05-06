import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';

import { useSignIn } from 'services/auth/mutations';
import { AuthForm } from 'components/AuthForm';
import { signInSchema, SignInUser } from 'schemas/auth';

export const SignIn = (): JSX.Element => {
  const { mutate, error, isLoading } = useSignIn();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInUser>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInUser) => mutate(data);

  return (
    <AuthForm
      type="signIn"
      handleSubmit={handleSubmit(onSubmit)}
      control={control}
      apiError={
        error instanceof AxiosError
          ? (error.response?.data?.error as string)
          : ''
      }
      errors={errors}
      isLoading={isLoading}
    />
  );
};
