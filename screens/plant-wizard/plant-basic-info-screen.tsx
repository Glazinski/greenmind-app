import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Checkbox, Text } from 'react-native-paper';

import { Layout } from 'components/layout';
import { ImageSelector } from 'components/image-selector';
import { TextField } from 'components/ui/text-field';
import { useWizard } from 'components/wizard-form/use-wizard';
import { PlantStep } from 'components/plant/plant-form/plant-step';
import { PlantWizardStackScreenProps } from 'navigation/types';
import { BackendPlant, PlantBasicInfoInputs } from 'schemas/plants';
import { usePlantFormStore } from 'store/use-plant-form-store';
import { usePlant } from 'services/plants/queries';
import { usePlantForm } from 'hooks/use-plant-form';

export const PlantBasicInfoScreen = ({
  route,
}: PlantWizardStackScreenProps<'PlantBasicInfo'>) => {
  const { params } = route;
  const { t } = useTranslation();
  const stepsData = usePlantFormStore((state) => state.stepsData);
  const setStepData = usePlantFormStore((state) => state.setStepData);
  const setStepsData = usePlantFormStore((state) => state.setStepsData);
  const setStepParams = usePlantFormStore((state) => state.setStepParams);
  const { plantId, type } = usePlantFormStore((state) => state.stepParams);
  const stepData = stepsData[0];
  const { nextStep } = useWizard();
  const { control, handleSubmit } = usePlantForm<PlantBasicInfoInputs>();
  const navigation =
    useNavigation<
      PlantWizardStackScreenProps<'PlantBasicInfo'>['navigation']
    >();
  const { isError } = usePlant(plantId, onSuccess);
  const isAssigned = stepData?.status === 'assigned';

  React.useEffect(() => {
    setStepParams({
      plantId: params?.plantId,
      type: params?.type,
    });
  }, [setStepParams, params?.plantId, params?.type]);

  function onSuccess(backendPlant: BackendPlant) {
    if (backendPlant) {
      const {
        name,
        attached_image_url,
        image_url,
        status,
        appearance,
        light_min,
        light_max,
        temp_min,
        temp_max,
        air_humidity_min,
        air_humidity_max,
        soil_humidity_min,
        soil_humidity_max,
        fertilizing,
        repotting,
        pruning,
        common_diseases,
        blooming_time,
      } = backendPlant;
      const image = attached_image_url ?? image_url ?? '';

      setStepsData([
        {
          name: name ?? '',
          appearance: appearance ?? '',
          image,
          status: status ?? 'private',
        },
        {
          light_min: light_min?.toString() || '',
          light_max: light_max?.toString() || '',
          temp_min: temp_min?.toString() || '',
          temp_max: temp_max?.toString() || '',
          air_humidity_min: air_humidity_min?.toString() ?? '',
          air_humidity_max: air_humidity_max?.toString() ?? '',
          soil_humidity_min: soil_humidity_min?.toString() ?? '',
          soil_humidity_max: soil_humidity_max?.toString() ?? '',
        },
        {
          fertilizing: fertilizing ?? '',
          repotting: repotting ?? '',
          pruning: pruning ?? '',
          common_diseases: common_diseases ?? '',
          blooming_time: blooming_time ?? '',
        },
      ]);
    }
  }

  const onSubmit = (data: PlantBasicInfoInputs) => {
    setStepData(0, data);
    nextStep();
    navigation.navigate('PlantIdealConditions');
  };

  if (isError) {
    return (
      <Layout>
        <Text variant="bodyMedium">Something went wrong</Text>
      </Layout>
    );
  }

  return (
    <PlantStep>
      <PlantStep.Title>Basic information</PlantStep.Title>
      <PlantStep.Body>
        <View style={styles.imageSelector}>
          <Controller
            render={({ field }) => (
              <ImageSelector onChange={field.onChange} value={field.value} />
            )}
            name="image"
            control={control}
          />
        </View>
        {!isAssigned && (
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox.Item
                label={t('community_share_toggle')}
                status={value === 'public' ? 'checked' : 'unchecked'}
                onPress={() =>
                  onChange(value === 'public' ? 'private' : 'public')
                }
              />
            )}
            name="status"
          />
        )}
        <TextField
          mode="outlined"
          label={t('name') as string}
          name="name"
          control={control}
          required
        />
        <TextField
          mode="outlined"
          label={t('appearance') as string}
          name="appearance"
          control={control}
        />
      </PlantStep.Body>
      <PlantStep.Navigation onPress={handleSubmit(onSubmit)} />
    </PlantStep>
  );
};

const styles = StyleSheet.create({
  imageSelector: {
    marginBottom: 16,
  },
  checkbox: {
    borderRadius: 12,
  },
});
