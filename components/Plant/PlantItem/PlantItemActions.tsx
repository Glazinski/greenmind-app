import React from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useDeletePlant } from 'services/plants/mutations';
import { HomeDrawerScreenProps } from 'navigation/types';
import { useAuthStore } from 'store/useAuthStore';

interface PlantItemActionsProps {
  plantId: number;
  plantUserId: number;
}

export const PlantItemActions = ({
  plantId,
  plantUserId,
}: PlantItemActionsProps) => {
  const userId = useAuthStore((state) => state.userId);
  const [visible, setVisible] = React.useState(false);
  const { mutate: deletePlant } = useDeletePlant();
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Plants'>['navigation']>();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  if (userId !== plantUserId) {
    return <IconButton icon="star-outline" />;
  }

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
      anchorPosition="bottom"
    >
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
    </Menu>
  );
};
