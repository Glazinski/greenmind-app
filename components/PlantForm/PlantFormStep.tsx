import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import { useForm, DeepPartial, Control } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { usePlantFormStore } from 'store/usePlantFormStore';
import { StepFormData } from 'schemas/plants';

interface PlantFormStepProps<TFormData extends StepFormData> {
  index: number;
  title: string;
  schema: z.ZodSchema<TFormData>;
  renderFields: (control: Control<TFormData>) => React.ReactNode;
  lastStepButtonContent?: JSX.Element;
  onSubmit?: () => void;
}

export const PlantFormStep = <TFormData extends StepFormData>({
  index,
  title,
  schema,
  renderFields,
  onSubmit,
  lastStepButtonContent,
}: PlantFormStepProps<TFormData>) => {
  const activeStep = usePlantFormStore((state) => state.activeStep);
  const formData = usePlantFormStore((state) => state.steps[index]);
  const setSteps = usePlantFormStore((state) => state.setSteps);
  const nextStep = usePlantFormStore((state) => state.nextStep);
  const { control, handleSubmit, reset } = useForm<TFormData>({
    defaultValues: formData as unknown as DeepPartial<TFormData>,
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    reset(formData as unknown as DeepPartial<TFormData>);
  }, [formData, reset]);

  const handleSubmitAndPersist = (data: TFormData) => {
    setSteps(index, data);
    onSubmit?.();
    nextStep();
  };

  if (activeStep !== index) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineMedium">
        {title}
      </Text>
      {renderFields(control)}
      <PlantFormStepButtons
        onNext={handleSubmit(handleSubmitAndPersist)}
        lastStepButtonContent={lastStepButtonContent}
      />
    </View>
  );
};

interface PlantFormStepButtonsProps {
  onNext: () => void;
  lastStepButtonContent?: JSX.Element;
}

export const PlantFormStepButtons = ({
  onNext,
  lastStepButtonContent,
}: PlantFormStepButtonsProps) => {
  const activeStep = usePlantFormStore((state) => state.activeStep);
  const prevStep = usePlantFormStore((state) => state.prevStep);

  const {
    colors: { secondary },
  } = useTheme();

  const handleNextPress = async () => {
    onNext();
  };

  return (
    <View style={styles.buttonsContainer}>
      {activeStep > 0 && (
        <Button
          mode="contained"
          onPress={prevStep}
          style={[styles.button, { backgroundColor: secondary }]}
        >
          Go back
        </Button>
      )}
      <Button mode="contained" onPress={handleNextPress} style={styles.button}>
        {lastStepButtonContent || 'Go next'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  title: {
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  button: {
    flex: 1,
  },
});
