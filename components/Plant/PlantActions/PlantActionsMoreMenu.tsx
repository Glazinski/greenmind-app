import React from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useDeletePlant } from 'services/plants/mutations';
import { useDevices } from 'services/device/queries';
import { RootStackScreenProps } from 'navigation/types';
import { useAuthStore } from 'store/useAuthStore';

import { usePlantActions } from './PlantActionsContext';
import { PlantActionsMoreMenuAssign } from './PlantActionsMoreMenuAssign';

interface PlantActionsMoreMenuProps {
  onDeletePress?: () => void;
}

export const PlantActionsMoreMenu = ({
  onDeletePress,
}: PlantActionsMoreMenuProps) => {
  const userId = useAuthStore((state) => state.userId);
  const {
    plant: { id: plantId, user_id: plantUserId },
  } = usePlantActions();
  const { plant } = usePlantActions();
  const navigation =
    useNavigation<RootStackScreenProps<'Plant'>['navigation']>();
  const [visible, setVisible] = React.useState(false);
  const { mutate: deletePlant } = useDeletePlant();
  const { data: devices } = useDevices();
  const isUserPlant = userId === plantUserId;

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
      anchorPosition="bottom"
    >
      {devices && devices?.length > 0 && (
        <PlantActionsMoreMenuAssign plant={plant} onPress={closeMenu} />
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
              onDeletePress?.();
            }}
            title="Delete"
            leadingIcon="delete"
          />
        </>
      )}
    </Menu>
  );
};
