import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Portal, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { Button } from 'react-native-paper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import { Layout } from 'components/layout';
import { ImageSelector } from 'components/image-selector';
import { TextField } from 'components/ui/text-field';
import { DeviceInputScheme, FormDevice, BackendDevice } from 'schemas/devices';
import { DeviceWizardStackScreenProps } from 'navigation/types';
import { useDevice } from 'services/device/queries';
import { useEditDevice } from 'services/device/mutations';
import { ConfirmationDialog } from '../../components/ui/confirmation-dialog';

export const DeviceFormScreen = ({
  navigation,
  route,
}: DeviceWizardStackScreenProps<'DeviceForm'>) => {
  const { type, deviceId } = route.params;
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const [formData, setFormData] = React.useState<FormDevice>({
    name: '',
    image: '',
  });
  const { isError: isUseDeviceError } = useDevice(deviceId, {
    enabled: type === 'edit',
    onSuccess: onUseDeviceSuccess,
  });
  const {
    mutate: editDevice,
    isLoading: isEditDeviceLoading,
    isError: isEditDeviceError,
  } = useEditDevice(onUseEditDeviceSuccess);
  const { handleSubmit, control, reset, getValues } = useForm<FormDevice>({
    defaultValues: formData,
    resolver: zodResolver(DeviceInputScheme),
  });

  const showDialog = () => setVisible(true);

  function hideDialog() {
    setVisible(false);
  }

  function onUseDeviceSuccess(data: BackendDevice) {
    const newFormData = {
      name: data.name ?? '',
      image: data.image_url ?? '',
    };
    setFormData(newFormData);
    reset(newFormData);
  }

  function onUseEditDeviceSuccess() {
    hideDialog();
    navigation.navigate('Index', {
      screen: 'Devices',
    });
  }

  const onSubmit = () => {
    showDialog();
  };

  const onDialogSubmit = async () => {
    if (type === 'edit') {
      await editDevice({
        deviceId,
        formDevice: getValues(),
      });
    }
  };

  const renderSubmitButtonContent = () => {
    if (isEditDeviceError) return t('try_again');

    if (type === 'add') return t('add');

    return t('edit');
  };

  if (isUseDeviceError) {
    return (
      <Layout>
        <Text>{t('something_went_wrong')}</Text>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Controller
        name="image"
        control={control}
        render={({ field }) => (
          <ImageSelector value={field.value} onChange={field.onChange} />
        )}
      />
      <TextField
        style={styles.field}
        mode="outlined"
        control={control}
        name="name"
        label="Name"
        required
      />
      <Button onPress={handleSubmit(onSubmit)} mode="contained">
        {type === 'add' ? 'Add' : 'Edit'}
      </Button>
      <ConfirmationDialog
        visible={visible}
        onDismiss={hideDialog}
        isLoading={isEditDeviceLoading}
        isError={isEditDeviceError}
        onConfirmButtonPress={onDialogSubmit}
        confirmButtonText={renderSubmitButtonContent()}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  field: {
    marginTop: 16,
  },
});
