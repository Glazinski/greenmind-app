import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Text,
  Surface,
  TouchableRipple,
  Avatar,
  IconButton,
  Menu,
  useTheme,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { BackendDevice } from 'schemas/devices';
import { HomeDrawerScreenProps } from 'navigation/types';

interface DeviceItemProps {
  device: BackendDevice;
  onUseThisDeviceClick: () => void;
  onStopUseThisDeviceClick: () => void;
  onDeleteClick: () => void;
  isActive: boolean;
}

export const DeviceItem = ({
  device: { id, name },
  onDeleteClick,
  onUseThisDeviceClick,
  onStopUseThisDeviceClick,
  isActive,
}: DeviceItemProps) => {
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Devices'>['navigation']>();
  const {
    colors: { primaryContainer, secondaryContainer },
  } = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <TouchableRipple style={styles.container} borderless={true}>
      <Surface
        style={[
          styles.device,
          { backgroundColor: isActive ? primaryContainer : secondaryContainer },
        ]}
      >
        <Avatar.Image source={require('../../assets/icon.png')} />
        <View style={styles.deviceName}>
          <Text variant="titleMedium">{name}</Text>
        </View>
        <View style={styles.deviceActions}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
            anchorPosition="bottom"
          >
            {isActive ? (
              <Menu.Item
                onPress={() => {
                  onStopUseThisDeviceClick();
                  closeMenu();
                }}
                title="Stop using this device"
                leadingIcon="close-circle"
              />
            ) : (
              <Menu.Item
                onPress={() => {
                  onUseThisDeviceClick();
                  closeMenu();
                }}
                title="Use this device"
                leadingIcon="check-circle"
              />
            )}
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate('DeviceWizard', {
                  screen: 'DeviceStep2',
                  params: {
                    type: 'edit',
                    deviceId: id,
                  },
                });
              }}
              title="Edit"
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={() => {
                onDeleteClick();
                closeMenu();
              }}
              title="Delete"
              leadingIcon="delete"
            />
          </Menu>
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    borderRadius: 12,
  },
  device: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceName: {
    marginLeft: 16,
  },
  deviceActions: {
    marginLeft: 'auto',
  },
});
