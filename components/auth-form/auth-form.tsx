import * as React from 'react';
import { View } from 'react-native';
import {
  Button,
  Text,
  TextInput,
  useTheme,
  Appbar,
  HelperText,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { UnauthenticatedRootStackScreenProps } from 'navigation/types';

import { styles } from './auth-form.styles';

interface AuthFormProps {
  type: 'signIn' | 'signUp';
  handleSubmit: () => void;
  apiError: string;
  // TODO: Add better typings
  errors: any;
  control: any;
  isLoading: boolean;
}

export const AuthForm = ({
  type,
  handleSubmit,
  control,
  apiError,
  errors,
  isLoading,
}: AuthFormProps) => {
  const { t } = useTranslation();
  const {
    colors: { primary, background, error },
  } = useTheme();
  const navigation =
    useNavigation<
      UnauthenticatedRootStackScreenProps<'SignIn'>['navigation']
    >();
  const [passwordSecureEntry, setPasswordSecureEntry] = React.useState(true);
  const buttonAndTitleText = type === 'signIn' ? t('sign_in') : t('sign_up');
  const linkText = type === 'signIn' ? t('sign_up') : t('sign_in');

  return (
    <>
      {type === 'signUp' && (
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
      )}
      <View
        style={[
          styles.container,
          {
            backgroundColor: background,
            paddingTop: type === 'signIn' ? 86 : 0,
          },
        ]}
      >
        <Text style={styles.headline} variant="headlineMedium">
          {buttonAndTitleText}
        </Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.textInput}
              label={t<string>('email')}
              mode="outlined"
              autoComplete="email"
              keyboardType="email-address"
              error={!!errors?.email?.message}
              disabled={isLoading}
            />
          )}
        />
        <HelperText type="error" visible={!!errors?.email?.message}>
          {errors?.email?.message}
        </HelperText>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.textInput}
              label={t<string>('password')}
              mode="outlined"
              secureTextEntry={passwordSecureEntry}
              error={!!errors?.password?.message}
              autoComplete="password"
              disabled={isLoading}
              right={
                <TextInput.Icon
                  icon={passwordSecureEntry ? 'eye-off' : 'eye'}
                  onPress={() => setPasswordSecureEntry(!passwordSecureEntry)}
                  forceTextInputFocus={false}
                />
              }
            />
          )}
        />
        <HelperText type="error" visible={!!errors?.password?.message}>
          {errors?.password?.message}
        </HelperText>
        {type === 'signUp' && (
          <>
            <Controller
              control={control}
              name="passwordConfirmation"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  style={styles.textInput}
                  label={t<string>('password_confirmation')}
                  mode="outlined"
                  secureTextEntry={passwordSecureEntry}
                  error={!!errors?.passwordConfirmation?.message}
                  autoComplete="password"
                  disabled={isLoading}
                  right={
                    <TextInput.Icon
                      icon={passwordSecureEntry ? 'eye-off' : 'eye'}
                      onPress={() =>
                        setPasswordSecureEntry(!passwordSecureEntry)
                      }
                      forceTextInputFocus={false}
                    />
                  }
                />
              )}
            />
            <HelperText
              type="error"
              visible={!!errors?.passwordConfirmation?.message}
            >
              {errors?.passwordConfirmation?.message}
            </HelperText>
          </>
        )}
        {apiError && (
          <View style={[styles.apiErrorContainer]}>
            <Text variant="titleSmall" style={{ color: error }}>
              {apiError}
            </Text>
          </View>
        )}
        <View style={styles.footerContainer}>
          <Button
            onPress={handleSubmit}
            contentStyle={styles.footerButton}
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
          >
            {buttonAndTitleText}
          </Button>
          <View style={styles.footerLinkContainer}>
            <Button
              onPress={() =>
                navigation.navigate(type === 'signIn' ? 'SignUp' : 'SignIn')
              }
            >
              <Text style={[styles.footerLinkButton, { color: primary }]}>
                {linkText}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
