import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Menu,
  Portal,
  Dialog,
  Text,
  Button,
  Checkbox,
  ActivityIndicator,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { BackendPlant } from 'schemas/plants';
import { useAssignPlantToDevice } from 'services/plants/mutations';
import { useDevices } from 'services/device/queries';
import { usePlantsAssignedToDevice } from 'services/plants/queries';

import { usePlantActions } from './PlantActionsContext';

interface PlantActionsMoreMenuAssignProps {
  plant: BackendPlant;
  onPress?: () => void;
}

export const PlantActionsMoreMenuAssign = ({
  onPress,
  plant,
}: PlantActionsMoreMenuAssignProps) => {
  const { t } = useTranslation();
  const {
    data: devices,
    isLoading: isDevicesLoading,
    isError: isDevicesError,
  } = useDevices();
  const {
    mutate: assignPlantToDevice,
    isLoading: isAssignPlantToDeviceLoading,
  } = useAssignPlantToDevice();
  const [visible, setVisible] = React.useState(false);
  const isLoading = isDevicesLoading;
  const isError = isDevicesError;

  const showDialog = () => setVisible(true);

  const hideDialog = () => {
    setVisible(false);
    onPress?.();
  };

  const handleOnPress = async () => {
    showDialog();
    // if (plant) {
    //   await assignPlantToDevice(plant);
    // }
  };

  const handleCheckboxPress = async (deviceId: number) => {
    // Handle mutation for assigning plant to a device
    await assignPlantToDevice({ plant, deviceId });
  };

  const isPlantAssignedToAllDevices = (): boolean =>
    devices?.every?.(({ id }) => id === plant.device_id) ?? false;

  const renderContent = () => {
    if (isError) {
      return <Text>{t('something_went_wrong')}</Text>;
    }

    if (isLoading) {
      return <ActivityIndicator />;
    }

    if (!devices || devices.length === 0) {
      return <Text>{t('no_devices_found')}</Text>;
    }

    return (
      <Dialog.Content>
        <Text style={styles.textContent} variant="bodyMedium">
          Device can only have one plant assigned to it
        </Text>
        {devices.map(({ id, name }) => (
          <Checkbox.Item
            key={id}
            status={plant.device_id === id ? 'checked' : 'unchecked'}
            label={name}
            onPress={() => handleCheckboxPress(id)}
            disabled={isAssignPlantToDeviceLoading}
          />
        ))}
      </Dialog.Content>
    );
  };

  return (
    <>
      <Menu.Item
        onPress={handleOnPress}
        title={
          isPlantAssignedToAllDevices()
            ? 'Unassign from device'
            : 'Assign to Device'
        }
        leadingIcon="plus"
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Device assignment</Dialog.Title>
          {renderContent()}
          <Dialog.Actions>
            <Button
              onPress={hideDialog}
              disabled={isAssignPlantToDeviceLoading}
            >
              Close
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  textContent: {
    marginBottom: 8,
  },
});
