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

import { BackendDevice } from 'schemas/devices';

interface DeviceItemProps {
  device: BackendDevice;
  onUseThisDeviceClick: () => void;
  onDeleteClick: () => void;
  isActive: boolean;
}

export const DeviceItem = ({
  device: { name },
  onDeleteClick,
  onUseThisDeviceClick,
  isActive,
}: DeviceItemProps) => {
  const {
    colors: { secondaryContainer },
  } = useTheme();
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <TouchableRipple style={styles.container} borderless={true}>
      <Surface
        style={[
          styles.device,
          isActive ? { backgroundColor: secondaryContainer } : {},
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
            {!isActive && (
              <Menu.Item
                onPress={() => {
                  onUseThisDeviceClick();
                  closeMenu();
                }}
                title="Use this device"
                leadingIcon="power"
              />
            )}
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
