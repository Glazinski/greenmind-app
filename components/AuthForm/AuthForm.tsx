import * as React from 'react';
import { View } from 'react-native';
import { Button, Text, TextInput, useTheme, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Controller } from 'react-hook-form';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/src/types';

import type { UnauthenticatedAppParamList } from 'UnauthenticatedApp';

import { styles } from './AuthForm.styles';

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
  const {
    colors: { primary, background, error },
  } = useTheme();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<
        UnauthenticatedAppParamList,
        'SignIn' | 'SignUp'
      >
    >();
  const [passwordSecureEntry, setPasswordSecureEntry] = React.useState(true);
  const text = type === 'signIn' ? 'Sign in' : 'Sign up';

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
          {text}
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
              label="Email"
              mode="outlined"
              autoComplete="email"
              keyboardType="email-address"
              error={!!errors?.email?.message}
            />
          )}
        />
        <Text style={[styles.textInputError, { color: error }]}>
          {errors?.email?.message}
        </Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.textInput}
              label="Password"
              mode="outlined"
              secureTextEntry={passwordSecureEntry}
              error={!!errors?.password?.message}
              autoComplete="password"
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
        <Text style={[styles.textInputError, { color: error }]}>
          {errors?.password?.message}
        </Text>
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
                  label="Password confirmation"
                  mode="outlined"
                  secureTextEntry={passwordSecureEntry}
                  error={!!errors?.passwordConfirmation?.message}
                  autoComplete="password"
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
            <Text style={[styles.textInputError, { color: error }]}>
              {errors?.passwordConfirmation?.message}
            </Text>
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
            {text}
          </Button>
          <View style={styles.footerLinkContainer}>
            <Button
              onPress={() =>
                navigation.navigate(type === 'signIn' ? 'SignUp' : 'SignIn')
              }
            >
              <Text style={[styles.footerLinkButton, { color: primary }]}>
                {type === 'signIn' ? 'Sign up' : 'Sign in'}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
