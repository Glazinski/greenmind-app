import React from 'react';
import { TextInput } from 'react-native-paper';
import type { Control, FieldValues, FieldPath } from 'react-hook-form';

import { TextField } from 'components/ui/text-field';
import { useTranslation } from 'react-i18next';

interface PasswordFieldProps<TFormValues extends FieldValues> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  isLoading: boolean;
  label?: string;
}

export const PasswordField = <TFormValues extends FieldValues>(
  props: PasswordFieldProps<TFormValues>
) => {
  const { t } = useTranslation();
  const { control, name, label = t<string>('password'), isLoading } = props;
  const [passwordSecureEntry, setPasswordSecureEntry] = React.useState(true);

  const onEyePress = (): void => setPasswordSecureEntry(!passwordSecureEntry);

  return (
    <TextField
      name={name}
      label={label}
      control={control}
      mode="outlined"
      secureTextEntry={passwordSecureEntry}
      autoComplete="password"
      disabled={isLoading}
      right={
        <TextInput.Icon
          icon={passwordSecureEntry ? 'eye-off' : 'eye'}
          onPress={onEyePress}
          forceTextInputFocus={false}
        />
      }
    />
  );
};
