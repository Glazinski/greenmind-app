import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useDeletePlant } from 'services/plants/mutations';
import { HomeDrawerScreenProps } from 'navigation/types';
import { useAuthStore } from 'store/useAuthStore';
import { useActiveDeviceStore } from 'store/useActiveDeviceStore';
import { BackendPlant } from 'schemas/plants';

import { PlantItemAssignAction } from './PlantItemAssignAction';
import { PlantItemFavoriteAction } from './PlantItemFavoriteAction';

interface PlantItemActionsProps {
  plant: BackendPlant;
}

export const PlantItemActions = ({ plant }: PlantItemActionsProps) => {
  const { id: plantId, user_id: plantUserId } = plant;
  const userId = useAuthStore((state) => state.userId);
  const [visible, setVisible] = React.useState(false);
  const { mutate: deletePlant } = useDeletePlant();
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Plants'>['navigation']>();
  const { deviceId } = useActiveDeviceStore();
  const isUserPlant = userId === plantUserId;

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
        anchorPosition="bottom"
      >
        {deviceId && deviceId >= 0 && (
          <PlantItemAssignAction plant={plant} onPress={closeMenu} />
        )}
        {isUserPlant && (
          <>
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate('PlantWizard', {
                  screen: 'PlantStep1',
                  params: {
                    type: 'edit',
                    plantId: plantId,
                  },
                });
              }}
              title="Edit"
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
                deletePlant(plantId);
              }}
              title="Delete"
              leadingIcon="delete"
            />
          </>
        )}
      </Menu>
      <PlantItemFavoriteAction plantId={plantId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
});
