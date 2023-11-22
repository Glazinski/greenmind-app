import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useForm, DeepPartial, Control } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { usePlantFormStore } from 'store/use-plant-form-store';
import { StepFormData } from 'schemas/plants';
import { PlantWizardStackScreenProps } from 'navigation/types';

interface PlantFormStepProps<TFormData extends StepFormData> {
  index: number;
  title: string;
  schema: z.ZodSchema<TFormData>;
  renderFields: (control: Control<TFormData>) => React.ReactNode;
  onSubmit?: () => void;
}

export const PlantFormStep = <TFormData extends StepFormData>({
  index,
  title,
  schema,
  renderFields,
  onSubmit,
}: PlantFormStepProps<TFormData>) => {
  const navigation =
    useNavigation<PlantWizardStackScreenProps<'PlantStep1'>['navigation']>();
  const { type, plantId } =
    useRoute<PlantWizardStackScreenProps<'PlantStep1'>['route']>().params;
  const { activeStep, steps, setSteps, nextStep, prevStep } =
    usePlantFormStore();
  const formData = steps[index];
  const { control, handleSubmit, reset, getValues } = useForm<TFormData>({
    defaultValues: formData as unknown as DeepPartial<TFormData>,
    resolver: zodResolver(schema),
  });

  React.useEffect(() => {
    reset(formData as unknown as DeepPartial<TFormData>);
  }, [formData, reset]);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (index !== 0) {
          setSteps(index, getValues());
        }
        prevStep();
        return false;
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => subscription.remove();
    }, [getValues, index, setSteps, prevStep])
  );

  const handleSubmitAndPersist = (data: TFormData) => {
    setSteps(index, data);
    if (index !== Object.keys(steps).length - 1) {
      nextStep();
      // @ts-ignore
      navigation.navigate(`PlantStep${index + 2}`, {
        type,
        plantId,
      });
    }
    onSubmit?.();
  };

  const getButtonContent = () => {
    if (index === Object.keys(steps).length - 1) {
      return type === 'add' ? <>Add</> : <>Edit</>;
    }

    return <>Go next</>;
  };

  if (activeStep !== index) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="headlineMedium">
        {title}
      </Text>
      {renderFields(control)}
      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          onPress={handleSubmit(handleSubmitAndPersist)}
          style={styles.button}
        >
          {getButtonContent()}
        </Button>
      </View>
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
