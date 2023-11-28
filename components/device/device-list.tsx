import React from 'react';
import { FlatList } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

import { BackendDevice } from 'schemas/devices';
import { useDeleteDevice } from 'services/device/mutations';
import { useActiveDeviceStore } from 'store/use-active-device-store';

import { DeviceItem } from './device-item';

interface DeviceListProps {
  devices: BackendDevice[];
}

export const DeviceList = ({ devices }: DeviceListProps) => {
  const deviceId = useActiveDeviceStore((state) => state.deviceId);
  const setDeviceId = useActiveDeviceStore((state) => state.setDeviceId);
  const [visible, setVisible] = React.useState(false);
  const [deviceIdToDelete, setDeviceIdToDelete] = React.useState(-1);
  const { mutate: deleteDevice, isLoading } = useDeleteDevice(
    onDeleteDeviceSuccess
  );

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const onUseThisDeviceClick = (id: number) => {
    setDeviceId(id);
  };

  const onStopUseThisDeviceClick = () => {
    setDeviceId(null);
  };

  const onDeleteClick = (id: number) => {
    setDeviceIdToDelete(id);
    showDialog();
  };

  const handleDeleteConfirmation = async () => {
    deleteDevice(deviceIdToDelete);
  };

  function onDeleteDeviceSuccess() {
    hideDialog();
  }

  return (
    <>
      <FlatList
        data={devices}
        renderItem={({ item }) => (
          <DeviceItem
            device={item}
            onUseThisDeviceClick={() => onUseThisDeviceClick(item.id)}
            onStopUseThisDeviceClick={onStopUseThisDeviceClick}
            onDeleteClick={() => onDeleteClick(item.id)}
            isActive={item.id === deviceId}
          />
        )}
        keyExtractor={({ id }) => id.toString()}
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text variant="bodyLarge">Are you sure you want to proceed?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleDeleteConfirmation} loading={isLoading}>
              Yes
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
