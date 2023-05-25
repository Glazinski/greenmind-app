import { View, StyleSheet } from 'react-native';

import { PlantFormStep } from 'components/PlantForm/PlantFormStep';
import { PlantFormStep1 } from 'components/PlantForm/PlantFormStep1';
import { Layout } from 'components/Layout';
import { step1Schema } from 'schemas/plants';
import { usePlantFormStore } from 'store/usePlantFormStore';
import { usePrivatePlants } from 'services/plants/queries';
import { PlantWizardStackScreenProps } from 'navigation/types';
import { ImageSelector } from 'components/ImageSelector';

export const PlantStep1Screen = ({
  route,
}: PlantWizardStackScreenProps<'PlantStep1'>) => {
  const { plantId } = route.params;
  const setSteps = usePlantFormStore((state) => state.setSteps);
  const { data: privatePlants, isLoading } = usePrivatePlants(onSuccess);

  const backendPlant = privatePlants?.find(
    (privatePlant) => privatePlant.id === plantId
  );

  function onSuccess() {
    if (backendPlant) {
      const {
        name,
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

      setSteps('0', { name, appearance });
      setSteps('1', {
        light_min: light_min.toString(),
        light_max: light_max.toString(),
        temp_min: temp_min.toString(),
        temp_max: temp_max.toString(),
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

  return (
    <Layout>
      <PlantFormStep
        index={0}
        title={'Basic information'}
        schema={step1Schema}
        renderFields={(control) => (
          <>
            <View style={styles.imageSelector}>
              <ImageSelector />
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
