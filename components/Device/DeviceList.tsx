import React from 'react';
import { FlatList } from 'react-native';

import { BackendDevice } from 'schemas/devices';

import { DeviceItem } from './DeviceItem';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useActiveDeviceStore } from '../../store/useActiveDeviceStore';
import { useDeleteDevice } from '../../services/device/mutations';

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

  const onDeleteClick = (id: number) => {
    setDeviceIdToDelete(id);
    showDialog();
  };

  const handleDeleteConfirmation = async () => {
    await deleteDevice(deviceIdToDelete);
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
