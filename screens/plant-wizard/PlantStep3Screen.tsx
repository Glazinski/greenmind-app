import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { PlantFormStep } from 'components/PlantForm/PlantFormStep';
import { PlantFormStep3 } from 'components/PlantForm/PlantFormStep3';
import { BackendPlant, PlantFormData, step3Schema } from 'schemas/plants';
import { Layout } from 'components/Layout';
import { PlantWizardStackScreenProps } from 'navigation/types';
import { useAddPlant, useEditPlant } from 'services/plants/mutations';
import { usePlantFormStore } from 'store/usePlantFormStore';

export const PlantStep3Screen = ({
  navigation,
  route,
}: PlantWizardStackScreenProps<'PlantStep3'>) => {
  const [visible, setVisible] = React.useState(false);
  const { t } = useTranslation();
  const { type, plantId } = route.params;
  const steps = usePlantFormStore((state) => state.steps);
  const {
    mutate: addPlant,
    isLoading: isAddLoading,
    isError: isAddError,
    error: addError,
  } = useAddPlant(onSuccess);
  const {
    mutate: editPlant,
    isLoading: isEditLoading,
    isError: isEditError,
    error: editError,
  } = useEditPlant(onSuccess);
  const isLoading = isAddLoading || isEditLoading;
  const isError = isAddError || isEditError;
  const error = addError || editError;

  React.useEffect(() => {
    return () => {
      hideDialog();
    };
  }, []);

  function onSuccess() {
    hideDialog();
    navigation.navigate('Index', {
      screen: 'Plants',
    });
  }

  const showDialog = () => setVisible(true);

  function hideDialog() {
    setVisible(false);
  }

  const renderSubmitButtonContent = () => {
    if (isError) return t('try_again');

    if (type === 'add') return t('add');

    return t('edit');
  };

  const handleSubmit = async () => {
    let data = {};

    Object.keys(steps).forEach((key) => {
      data = { ...data, ...steps[key] };
    });

    const {
      light_min,
      light_max,
      air_humidity_min,
      air_humidity_max,
      soil_humidity_min,
      soil_humidity_max,
      temp_min,
      temp_max,
    } = data as PlantFormData;

    type === 'add'
      ? await addPlant(data as PlantFormData)
      : await editPlant({
          ...data,
          id: plantId,
          light_min: Number(light_min),
          light_max: Number(light_max),
          air_humidity_min: Number(air_humidity_min),
          air_humidity_max: Number(air_humidity_max),
          soil_humidity_min: Number(soil_humidity_min),
          soil_humidity_max: Number(soil_humidity_max),
          temp_min: Number(temp_min),
          temp_max: Number(temp_max),
        } as BackendPlant);
  };

  return (
    <Layout>
      <PlantFormStep
        index={2}
        title={'Other information'}
        schema={step3Schema}
        renderFields={(control) => <PlantFormStep3 control={control} />}
        onSubmit={showDialog}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyLarge">
              {isError
                ? error?.response?.data?.error
                : t('confirmation_message')}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleSubmit} loading={isLoading}>
              {renderSubmitButtonContent()}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Layout>
  );
};
