import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { PlantWizardStackScreenProps } from 'navigation/types';
import { ConfirmationDialog } from 'components/ui/confirmation-dialog';
import { TextField } from 'components/ui/text-field';
import { PlantStep } from 'components/plant/plant-form/plant-step';
import { usePlantForm } from 'hooks/use-plant-form';
import { PlantOtherInfoInputs } from 'schemas/plants';
import { useAddPlant, useEditPlant } from 'services/plants/mutations';
import { usePlantFormStore } from 'store/use-plant-form-store';

export const PlantOtherInfoScreen = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const navigation =
    useNavigation<
      PlantWizardStackScreenProps<'PlantOtherInfo'>['navigation']
    >();
  const { control, handleSubmit } = usePlantForm<PlantOtherInfoInputs>();
  const { type, plantId } = usePlantFormStore((state) => state.stepParams);
  const stepsData = usePlantFormStore((state) => state.stepsData);
  const {
    mutate: addPlant,
    isLoading: isAddLoading,
    isError: isAddError,
  } = useAddPlant(onSuccess);
  const {
    mutate: editPlant,
    isLoading: isEditLoading,
    isError: isEditError,
  } = useEditPlant(onSuccess);
  const isLoading = isAddLoading || isEditLoading;
  const isError = isAddError || isEditError;

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

  const onSubmit = (): void => {
    let data = {} as any;
    stepsData.forEach((step) => {
      data = { ...data, ...step };
    });

    if (type === 'add') {
      addPlant(data);
      return;
    }

    editPlant({
      plant: data,
      plantId: plantId as number,
    });
  };

  const renderSubmitButtonContent = () => {
    if (isError) return t('try_again');

    if (type === 'add') return t('add');

    return t('edit');
  };

  return (
    <PlantStep>
      <PlantStep.Title>Other information</PlantStep.Title>
      <PlantStep.Body>
        <TextField
          mode="outlined"
          label={t('fertilizing') as string}
          name="fertilizing"
          control={control}
        />
        <TextField
          mode="outlined"
          label={t('repotting') as string}
          name="repotting"
          control={control}
        />
        <TextField
          mode="outlined"
          label={t('pruning') as string}
          name="pruning"
          control={control}
        />
        <TextField
          mode="outlined"
          label={t('common_diseases') as string}
          name="common_diseases"
          control={control}
        />
        <TextField
          mode="outlined"
          label={t('blooming_time') as string}
          name="blooming_time"
          control={control}
        />
      </PlantStep.Body>
      <PlantStep.Navigation onPress={showDialog} />
      <ConfirmationDialog
        visible={visible}
        onDismiss={hideDialog}
        isLoading={isLoading}
        isError={isError}
        onConfirmButtonPress={handleSubmit(onSubmit)}
        confirmButtonText={renderSubmitButtonContent()}
      />
    </PlantStep>
  );
};
