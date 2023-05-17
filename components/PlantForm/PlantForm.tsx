import React from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { usePlantFormStore } from 'store/usePlantFormStore';
import {
  BackendPlant,
  PlantFormData,
  step1Schema,
  step2Schema,
  step3Schema,
} from 'schemas/plants';

import { PlantFormStep } from './PlantFormStep';
import { PlantFormStep1 } from './PlantFormStep1';
import { PlantFormStep2 } from './PlantFormStep2';
import { PlantFormStep3 } from './PlantFormStep3';
import { useAddPlant, useEditPlant } from '../../services/plants/mutations';

interface PlantFormProps {
  type: 'add' | 'edit';
  plantId?: number;
}

export const PlantForm = ({ type, plantId }: PlantFormProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const resetSteps = usePlantFormStore((state) => state.resetSteps);
  const resetStepsData = usePlantFormStore((state) => state.resetStepsData);
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
      resetSteps();
      resetStepsData();
    };
  }, [resetSteps, resetStepsData]);

  function onSuccess() {
    resetStepsData();
    navigation.goBack();
  }

  const showDialog = () => setVisible(true);

  function hideDialog() {
    setVisible(false);
  }

  const handleSubmit = async () => {
    let data = {};

    Object.keys(steps).forEach((key) => {
      data = { ...data, ...steps[key] };
    });

    const {
      light_min,
      light_max,
      humidity_min,
      humidity_max,
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
          humidity_min: Number(humidity_min),
          humidity_max: Number(humidity_max),
          temp_min: Number(temp_min),
          temp_max: Number(temp_max),
        } as BackendPlant);
  };

  const renderSubmitButtonContent = () => {
    if (isError) return t('try_again');

    if (type === 'add') return t('add');

    return t('edit');
  };

  return (
    <View>
      <PlantFormStep
        index={0}
        title={t('basic_information')}
        schema={step1Schema}
        renderFields={(control) => <PlantFormStep1 control={control} />}
      />

      <PlantFormStep
        index={1}
        title={t('ideal_conditions')}
        schema={step2Schema}
        renderFields={(control) => <PlantFormStep2 control={control} />}
      />

      <PlantFormStep
        index={2}
        title={t('other_information')}
        schema={step3Schema}
        renderFields={(control) => <PlantFormStep3 control={control} />}
        lastStepButtonContent={type === 'add' ? <>Add</> : <>Edit</>}
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
    </View>
  );
};
