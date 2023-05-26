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
import { Platform } from 'react-native';

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

  const createImageToUpload = (image: string) => {
    const filename = image.split('/').pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;

    return {
      uri: image,
      name: `image.${ext}`,
      type,
    };
  };

  const handleSubmit = async () => {
    let data = {} as PlantFormData;
    Object.keys(steps).forEach((key) => {
      data = { ...data, ...steps[key] };
    });

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== 'image') {
        formData.append(
          `plant[${key}]`,
          data[key as keyof PlantFormData].toString()
        );
      }
    });

    if (data?.image?.length > 0 && data.image.includes('file://')) {
      formData.append(
        'plant[image]',
        createImageToUpload(data?.image) as unknown as string
      );
    }

    if (type === 'add') {
      await addPlant(formData);
      return;
    }

    await editPlant({
      plant: formData,
      plantId: plantId as number,
    });
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
              {isError ? t('something_went_wrong') : t('confirmation_message')}
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
