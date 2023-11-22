import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { PlantFormStep } from 'components/Plant/plant-form/plant-form-step';
import { PlantFormStep3 } from 'components/Plant/plant-form/plant-form-step-3';
import { PlantFormData, step3Schema } from 'schemas/plants';
import { Layout } from 'components/layout';
import { ConfirmationDialog } from 'components/confirmation-dialog';
import { PlantWizardStackScreenProps } from 'navigation/types';
import { useAddPlant, useEditPlant } from 'services/plants/mutations';
import { usePlantFormStore } from 'store/use-plant-form-store';

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

  const renderSubmitButtonContent = () => {
    if (isError) return t('try_again');

    if (type === 'add') return t('add');

    return t('edit');
  };

  const handleSubmit = async () => {
    let data = {} as PlantFormData;
    Object.keys(steps).forEach((key) => {
      data = { ...data, ...steps[key] };
    });

    if (type === 'add') {
      await addPlant(data);
      return;
    }

    await editPlant({
      plant: data,
      plantId: plantId as number,
    });
  };

  return (
    <Layout as={ScrollView}>
      <PlantFormStep
        index={2}
        title={t('other_information')}
        schema={step3Schema}
        renderFields={(control) => <PlantFormStep3 control={control} />}
        onSubmit={showDialog}
      />
      <ConfirmationDialog
        visible={visible}
        onDismiss={hideDialog}
        isLoading={isLoading}
        isError={isError}
        onConfirmButtonPress={handleSubmit}
        confirmButtonText={renderSubmitButtonContent()}
      />
    </Layout>
  );
};
