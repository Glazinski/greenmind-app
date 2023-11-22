import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { PlantFormStep } from 'components/Plant/plant-form/plant-form-step';
import { PlantFormStep1 } from 'components/Plant/plant-form/plant-form-step-1';
import { Layout } from 'components/layout';
import { BackendPlant, step1Schema } from 'schemas/plants';
import { usePlantFormStore } from 'store/use-plant-form-store';
import { usePlant } from 'services/plants/queries';
import { PlantWizardStackScreenProps } from 'navigation/types';

export const PlantStep1Screen = ({
  route,
}: PlantWizardStackScreenProps<'PlantStep1'>) => {
  const { t } = useTranslation();
  const { plantId } = route.params;
  const setSteps = usePlantFormStore((state) => state.setSteps);
  const { data: plant, isError } = usePlant(plantId, onSuccess);

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

      setSteps('0', {
        name: name ?? '',
        appearance: appearance ?? '',
        image,
        status: backendPlant.status ?? 'private',
      });
      setSteps('1', {
        light_min: light_min?.toString() || '',
        light_max: light_max?.toString() || '',
        temp_min: temp_min?.toString() || '',
        temp_max: temp_max?.toString() || '',
        air_humidity_min: air_humidity_min?.toString() ?? '',
        air_humidity_max: air_humidity_max?.toString() ?? '',
        soil_humidity_min: soil_humidity_min?.toString() ?? '',
        soil_humidity_max: soil_humidity_max?.toString() ?? '',
      });
      setSteps('2', {
        fertilizing: fertilizing ?? '',
        repotting: repotting ?? '',
        pruning: pruning ?? '',
        common_diseases: common_diseases ?? '',
        blooming_time: blooming_time ?? '',
      });
    }
  }

  if (isError) {
    return (
      <Layout>
        <Text variant="bodyMedium">Something went wrong</Text>
      </Layout>
    );
  }

  return (
    <Layout as={ScrollView}>
      <PlantFormStep
        index={0}
        title={t('basic_information')}
        schema={step1Schema}
        renderFields={(control) => (
          <PlantFormStep1
            control={control}
            isAssigned={plant?.status === 'assigned'}
          />
        )}
      />
    </Layout>
  );
};
