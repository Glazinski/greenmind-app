import React from 'react';
import { TextInput, TextInputProps, HelperText } from 'react-native-paper';
import { useController, Control } from 'react-hook-form';

interface TextFieldProps extends TextInputProps {
  name: string;
  control: Control<any>;
}

export const TextField = ({
  control,
  name: fieldName,
  ...rest
}: TextFieldProps) => {
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
      />
      <HelperText type="error" visible={hasError}>
        {errorMessage}
      </HelperText>
    </>
  );
};
