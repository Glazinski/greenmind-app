import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Layout } from 'components/layout';
import { TextField } from 'components/ui/text-field';
import { PlantStepContainer } from 'components/plant/plant-form/plant-step-container';
import { PlantIdealConditionsInputs } from 'schemas/plants';
import { usePlantForm } from 'hooks/use-plant-form';
import { PlantStepNavigation } from '../../components/plant/plant-form/plant-step-navigation';
import React from 'react';
import { usePlantFormStore } from '../../store/use-plant-form-store';
import { useWizard } from '../../components/wizard-form/use-wizard';
import { useNavigation } from '@react-navigation/native';
import { PlantWizardStackScreenProps } from '../../navigation/types';

export const PlantIdealConditionsScreen = () => {
  const { t } = useTranslation();
  const { setStepData } = usePlantFormStore();
  const { nextStep } = useWizard();
  const { control, handleSubmit } = usePlantForm<PlantIdealConditionsInputs>();
  const navigation =
    useNavigation<
      PlantWizardStackScreenProps<'PlantBasicInfo'>['navigation']
    >();

  const onSubmit = (data: PlantIdealConditionsInputs) => {
    setStepData(1, data);
    nextStep();
    navigation.navigate('PlantOtherInfo');
  };

  const renderMinMaxRow = (
    label: string,
    fieldName: 'light' | 'temp' | 'soil_humidity' | 'air_humidity'
  ) => (
    <PlantStepContainer>
      <Text variant="titleMedium">{label}</Text>
      <View style={styles.minMaxFields}>
        <View style={styles.minMaxField}>
          <TextField
            mode="outlined"
            label="min"
            name={`${fieldName}_min`}
            control={control}
            keyboardType="numeric"
            required
          />
        </View>
        <View style={styles.minMaxField}>
          <TextField
            mode="outlined"
            label="max"
            name={`${fieldName}_max`}
            control={control}
            required
            keyboardType="numeric"
          />
        </View>
      </View>
    </PlantStepContainer>
  );

  return (
    <Layout as={ScrollView}>
      <View>
        {renderMinMaxRow(t('temperature'), 'temp')}
        {renderMinMaxRow(t('air_humidity'), 'air_humidity')}
        {renderMinMaxRow(t('soil_humidity'), 'soil_humidity')}
        {renderMinMaxRow(t('light'), 'light')}
      </View>
      <PlantStepNavigation onPress={handleSubmit(onSubmit)} />
    </Layout>
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
