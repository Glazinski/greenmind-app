import React from 'react';
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { useController, FieldValues } from 'react-hook-form';
import type { Control, FieldPath } from 'react-hook-form';

interface TextFieldProps<TFormValues extends FieldValues>
  extends TextInputProps {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  required?: boolean;
}

export const TextField = <TFormValues extends FieldValues>({
  control,
  name: fieldName,
  label,
  required,
  ...rest
}: TextFieldProps<TFormValues>) => {
  const {
    field: { onChange, onBlur, value, name },
    formState: { errors },
  } = useController({
    name: fieldName,
    control,
  });
  const errorMessage = errors?.[name]?.message as string;
  const hasError = !!errorMessage;

  return (
    <>
      <TextInput
        {...rest}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        error={hasError}
        label={required ? `${label}*` : label}
      />
      <HelperText type="error" visible={hasError}>
        {errorMessage}
      </HelperText>
    </>
  );
};
