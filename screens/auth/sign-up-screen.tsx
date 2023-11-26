import * as React from 'react';
import { AxiosError } from 'axios';
import { Text } from 'react-native-paper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import { AuthForm, EmailField, PasswordField } from 'components/auth-form';
import { useSignUp } from 'services/auth/mutations';
import { UserSignUpScheme, UserSignUpData } from 'schemas/auth';
import { styles } from 'components/auth-form/auth-form.styles';

export const SignUpScreen = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { mutate, error, isLoading } = useSignUp();

  const onSubmit = (data: UserSignUpData) => mutate(data);

  return (
    <AuthForm<UserSignUpData>
      type="signUp"
      onSubmit={onSubmit}
      apiError={
        error instanceof AxiosError
          ? (error.response?.data?.errors?.[0] as string)
          : ''
      }
      isLoading={isLoading}
      config={{
        defaultValues: {
          email: '',
          password: '',
          passwordConfirmation: '',
        },
        resolver: zodResolver(UserSignUpScheme),
      }}
    >
      {({ control }) => (
        <>
          <Text style={styles.headline} variant="headlineMedium">
            {t('sign_up')}
          </Text>
          <EmailField<UserSignUpData>
            name="email"
            control={control}
            isLoading={isLoading}
          />
          <PasswordField<UserSignUpData>
            name="password"
            control={control}
            isLoading={isLoading}
          />
          <PasswordField<UserSignUpData>
            name="passwordConfirmation"
            control={control}
            isLoading={isLoading}
            label={t<string>('password_confirmation')}
          />
        </>
      )}
    </AuthForm>
  );
};
