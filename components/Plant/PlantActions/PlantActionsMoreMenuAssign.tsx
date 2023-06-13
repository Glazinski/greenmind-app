import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Menu,
  Portal,
  Dialog,
  Text,
  Button,
  ActivityIndicator,
  List,
  Avatar,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { BackendPlant } from 'schemas/plants';
import { useAssignPlantToDevice } from 'services/plants/mutations';
import { useDevices } from 'services/device/queries';
import { useAssignedPlants } from 'services/plants/queries';
import { getImageUrl } from 'services/getImageUrl';

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
    data: assignedPlants,
    isLoading: isAssignedPlantsLoading,
    isError: isAssignedPlantsError,
  } = useAssignedPlants();
  const {
    mutate: assignPlantToDevice,
    isLoading: isAssignPlantToDeviceLoading,
  } = useAssignPlantToDevice(hideDialog);
  const [visible, setVisible] = React.useState(false);
  const isLoading = isDevicesLoading || isAssignedPlantsLoading;
  const isError = isDevicesError || isAssignedPlantsError;

  const showDialog = () => setVisible(true);

  function hideDialog() {
    setVisible(false);
    onPress?.();
  }

  const handleOnPress = async () => {
    showDialog();
  };

  const handleDeviceItemPress = async (deviceId: number) => {
    await assignPlantToDevice({ plant, deviceId });
  };

  const hasAllDevicesAssignedPlant = (): boolean =>
    devices?.every((device) =>
      assignedPlants?.some(
        (assignedPlant) => device.id === assignedPlant.device_id
      )
    ) ?? false;

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
        {!hasAllDevicesAssignedPlant() ? (
          <>
            <Text style={styles.textContent} variant="bodyMedium">
              {t('plant_assignment_message')}
            </Text>
            {devices.map(({ id, name, image_url }) => (
              <List.Item
                key={id}
                title={name}
                onPress={() => handleDeviceItemPress(id)}
                left={() => (
                  <Avatar.Image size={30} source={getImageUrl(image_url)} />
                )}
              />
            ))}
          </>
        ) : (
          <Text>{t('cannot_assign_plant_message')}</Text>
        )}
      </Dialog.Content>
    );
  };

  return (
    <>
      <Menu.Item
        onPress={handleOnPress}
        title={t('assign_to_device')}
        leadingIcon="plus"
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{t('device_assignment')}</Dialog.Title>
          {renderContent()}
          <Dialog.Actions>
            <Button
              onPress={hideDialog}
              disabled={isAssignPlantToDeviceLoading}
            >
              {t('close')}
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
