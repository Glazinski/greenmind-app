import { View, StyleSheet, ScrollView } from 'react-native';
import { Controller } from 'react-hook-form';
import { Text } from 'react-native-paper';

import { PlantFormStep } from 'components/PlantForm/PlantFormStep';
import { PlantFormStep1 } from 'components/PlantForm/PlantFormStep1';
import { Layout } from 'components/Layout';
import { BackendPlant, step1Schema } from 'schemas/plants';
import { usePlantFormStore } from 'store/usePlantFormStore';
import { usePrivatePlants } from 'services/plants/queries';
import { PlantWizardStackScreenProps } from 'navigation/types';
import { ImageSelector } from 'components/ImageSelector';

export const PlantStep1Screen = ({
  route,
}: PlantWizardStackScreenProps<'PlantStep1'>) => {
  const { plantId } = route.params;
  const setSteps = usePlantFormStore((state) => state.setSteps);
  const { isError } = usePrivatePlants(onSuccess);

  function onSuccess(data: BackendPlant[]) {
    const backendPlant = data?.find(
      (privatePlant) => privatePlant.id === plantId
    );

    if (backendPlant) {
      const {
        name,
        image_url,
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

      setSteps('0', { name, appearance, image: image_url });
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
        fertilizing,
        repotting,
        pruning,
        common_diseases,
        blooming_time,
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
        title={'Basic information'}
        schema={step1Schema}
        renderFields={(control) => (
          <>
            <View style={styles.imageSelector}>
              <Controller
                render={({ field }) => {
                  return (
                    <ImageSelector
                      onChange={field.onChange}
                      value={field.value}
                    />
                  );
                }}
                name="image"
                control={control}
              />
            </View>
            <PlantFormStep1 control={control} />
          </>
        )}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageSelector: {
    marginBottom: 16,
  },
});
