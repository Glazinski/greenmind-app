import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { TextField } from 'components/ui/text-field';
import { PlantIdealConditionsInputs } from 'schemas/plants';
import { usePlantForm } from 'hooks/use-plant-form';
import { PlantStep } from 'components/plant/plant-form/plant-step';
import { usePlantFormStore } from 'store/use-plant-form-store';
import { useWizard } from 'components/wizard-form/use-wizard';
import { PlantWizardStackScreenProps } from 'navigation/types';

export const PlantIdealConditionsScreen = () => {
  const { t } = useTranslation();
  const { setStepData } = usePlantFormStore();
  const { nextStep } = useWizard();
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitted },
  } = usePlantForm<PlantIdealConditionsInputs>();
  const navigation =
    useNavigation<
      PlantWizardStackScreenProps<'PlantBasicInfo'>['navigation']
    >();

  const onSubmit = (data: PlantIdealConditionsInputs) => {
    nextStep();
    setStepData(1, data);
    navigation.navigate('PlantOtherInfo');
  };

  const renderMinMaxRow = (
    label: string,
    fieldName: 'light' | 'temp' | 'soil_humidity' | 'air_humidity'
  ) => {
    const minFieldName = `${fieldName}_min` as const;
    const maxFieldName = `${fieldName}_max` as const;
    const minValue = watch(minFieldName);
    const maxValue = watch(maxFieldName);

    if (
      isSubmitted &&
      parseFloat(minValue) > parseFloat(maxValue) &&
      !errors[minFieldName]?.message
    ) {
      setError(minFieldName, {
        message: t('min_must_be_less_than_max') as string,
      });
    }

    return (
      <>
        <Text variant="titleMedium">{label}</Text>
        <View style={styles.minMaxFields}>
          <View style={styles.minMaxField}>
            <TextField
              mode="outlined"
              label="min"
              name={minFieldName}
              control={control}
              required
              keyboardType="numeric"
            />
          </View>
          <View style={styles.minMaxField}>
            <TextField
              mode="outlined"
              label="max"
              name={maxFieldName}
              control={control}
              required
              keyboardType="numeric"
            />
          </View>
        </View>
      </>
    );
  };

  return (
    <PlantStep>
      <PlantStep.Title>{t('ideal_conditions')}</PlantStep.Title>
      <PlantStep.Body>
        {renderMinMaxRow(t('temperature'), 'temp')}
        {renderMinMaxRow(t('air_humidity'), 'air_humidity')}
        {renderMinMaxRow(t('soil_humidity'), 'soil_humidity')}
        {renderMinMaxRow(t('light'), 'light')}
      </PlantStep.Body>
      <PlantStep.Navigation onPress={handleSubmit(onSubmit)} />
    </PlantStep>
  );
};

const styles = StyleSheet.create({
  minMaxFields: {
    flexDirection: 'row',
    gap: 16,
  },
  minMaxField: {
    flex: 1,
  },
});
