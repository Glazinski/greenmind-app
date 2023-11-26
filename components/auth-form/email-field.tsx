import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { TextField } from 'components/ui/text-field';

import { styles } from './auth-form.styles';

interface EmailFieldProps<TFormValues extends FieldValues> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  isLoading: boolean;
}

export const EmailField = <TFormValues extends FieldValues>({
  name,
  control,
  isLoading,
}: EmailFieldProps<TFormValues>) => {
  const { t } = useTranslation();

  return (
    <TextField
      name={name}
      control={control}
      mode="outlined"
      label={t<string>('email')}
      autoComplete="email"
      keyboardType="email-address"
      disabled={isLoading}
      style={styles.textInput}
    />
  );
};
