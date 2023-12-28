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
import { useTranslation } from 'react-i18next';

import { BackendDevice } from 'schemas/devices';
import { HomeDrawerScreenProps } from 'navigation/types';
import { getImageUrl } from 'services/get-image-url';
import { DEFAULT_IMAGES } from 'constants/default-images';

interface DeviceItemProps {
  device: BackendDevice;
  onUseThisDeviceClick: () => void;
  onStopUseThisDeviceClick: () => void;
  onDeleteClick: () => void;
  isActive: boolean;
}

export const DeviceItem = ({
  device: { id, name, image_url },
  onDeleteClick,
  onUseThisDeviceClick,
  onStopUseThisDeviceClick,
  isActive,
}: DeviceItemProps) => {
  const { t } = useTranslation();
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
        <Avatar.Image source={getImageUrl(image_url, DEFAULT_IMAGES.device)} />
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
                title={t('stop_using_this_device')}
                leadingIcon="close-circle"
              />
            ) : (
              <Menu.Item
                onPress={() => {
                  onUseThisDeviceClick();
                  closeMenu();
                }}
                title={t('use_this_device')}
                leadingIcon="check-circle"
              />
            )}
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate('DeviceWizard', {
                  screen: 'DeviceForm',
                  params: {
                    type: 'edit',
                    deviceId: id,
                  },
                });
              }}
              title={t('edit')}
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={() => {
                onDeleteClick();
                closeMenu();
              }}
              title={t('delete')}
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
