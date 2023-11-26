import React from 'react';
import { View } from 'react-native';
import { Button, Text, useTheme, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type {
  UseFormReturn,
  UseFormProps,
  FieldValues,
  SubmitHandler,
} from 'react-hook-form';

import { UnauthenticatedRootStackScreenProps } from 'navigation/types';

import { styles } from './auth-form.styles';

interface AuthFormProps<TFormValues extends FieldValues> {
  type: 'signIn' | 'signUp';
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  apiError: string;
  isLoading: boolean;
  config?: UseFormProps<TFormValues>;
}

const formConfig = {
  signIn: {
    title: 'sign_in',
    linkTo: 'SignUp',
    linkText: 'sign_up',
  },
  signUp: {
    title: 'sign_up',
    linkTo: 'SignIn',
    linkText: 'sign_in',
  },
} as const;

export const AuthForm = <TFormValues extends FieldValues>({
  type,
  onSubmit,
  children,
  apiError,
  isLoading,
  config,
}: AuthFormProps<TFormValues>) => {
  const methods = useForm<TFormValues>(config);
  const { t } = useTranslation();
  const {
    colors: { primary, background, error },
  } = useTheme();
  const navigation =
    useNavigation<
      UnauthenticatedRootStackScreenProps<'SignIn'>['navigation']
    >();
  const { title, linkTo, linkText } = formConfig[type];
  const translatedTitle = t(title);
  const translatedLinkText = t(linkText);

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
        {children(methods)}
        {apiError && (
          <View style={[styles.apiErrorContainer]}>
            <Text variant="titleSmall" style={{ color: error }}>
              {apiError}
            </Text>
          </View>
        )}
        <View style={styles.footerContainer}>
          <Button
            onPress={methods.handleSubmit(onSubmit)}
            contentStyle={styles.footerButton}
            mode="contained"
            loading={isLoading}
            disabled={isLoading}
          >
            {translatedTitle}
          </Button>
          <View style={styles.footerLinkContainer}>
            <Button
              onPress={() =>
                navigation.navigate(type === 'signIn' ? 'SignUp' : 'SignIn')
              }
            >
              <Text style={[styles.footerLinkButton, { color: primary }]}>
                {translatedLinkText}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  );
};
