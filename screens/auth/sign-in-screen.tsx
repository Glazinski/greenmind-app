import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { useSignIn } from 'services/auth/mutations';
import { AuthForm } from 'components/auth-form/auth-form';
import { styles } from 'components/auth-form/auth-form.styles';
import { EmailField } from 'components/auth-form/email-field';
import { PasswordField } from 'components/auth-form/password-field';
import { UserSignInSchema, UserSignInData } from 'schemas/auth';

export const SignInScreen = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { mutate, error, isLoading } = useSignIn();

  const onSubmit = (data: UserSignInData) => mutate(data);

  return (
    <AuthForm<UserSignInData>
      type="signIn"
      onSubmit={onSubmit}
      isLoading={isLoading}
      apiError={
        error instanceof AxiosError
          ? (error.response?.data?.error as string)
          : ''
      }
      config={{
        defaultValues: {
          email: '',
          password: '',
        },
        resolver: zodResolver(UserSignInSchema),
      }}
    >
      {({ control }) => (
        <>
          <Text style={styles.headline} variant="headlineMedium">
            {t('sign_in')}
          </Text>
          <EmailField<UserSignInData>
            name="email"
            control={control}
            isLoading={isLoading}
          />
          <PasswordField<UserSignInData>
            name="password"
            control={control}
            isLoading={isLoading}
            label={t<string>('password')}
          />
        </>
      )}
    </AuthForm>
  );
};
