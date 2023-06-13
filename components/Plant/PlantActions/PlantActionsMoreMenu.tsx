import React from 'react';
import { IconButton, Menu } from 'react-native-paper';
import { useNavigation, CompositeScreenProps } from '@react-navigation/native';

import { useDevices } from 'services/device/queries';
import { RootStackScreenProps, HomeDrawerScreenProps } from 'navigation/types';
import { useAuthStore } from 'store/useAuthStore';

import { usePlantActions } from './PlantActionsContext';
import { PlantActionsMoreMenuAssign } from './PlantActionsMoreMenuAssign';
import { PlantActionsMoreMenuUnassign } from './PlantActionsMoreMenuUnassign';
import { PlantActionsMoreMenuDelete } from './PlantActionsMoreMenuDelete';

interface PlantActionsMoreMenuProps {
  onDeletePress?: () => void;
}

export const PlantActionsMoreMenu = ({
  onDeletePress,
}: PlantActionsMoreMenuProps) => {
  const userId = useAuthStore((state) => state.userId);
  const { plant } = usePlantActions();
  const { id: plantId, user_id: plantUserId, status } = plant;
  const navigation =
    useNavigation<
      CompositeScreenProps<
        RootStackScreenProps<'Plant'>,
        HomeDrawerScreenProps<'Plants'>
      >['navigation']
    >();
  const [visible, setVisible] = React.useState(false);
  const { data: devices } = useDevices();
  const isUserPlant = userId === plantUserId;

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const renderAssignmentItem = () => {
    if (!devices || devices.length === 0) return null;

    if (status === 'assigned') {
      return <PlantActionsMoreMenuUnassign plant={plant} onPress={closeMenu} />;
    }

    return <PlantActionsMoreMenuAssign plant={plant} onPress={closeMenu} />;
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={<IconButton icon="dots-vertical" onPress={openMenu} />}
      anchorPosition="bottom"
    >
      {renderAssignmentItem()}
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
          {status !== 'assigned' && (
            <PlantActionsMoreMenuDelete
              plantId={plantId}
              onDeletePress={() => {
                closeMenu();
                onDeletePress?.();
              }}
              onDismiss={closeMenu}
            />
          )}
        </>
      )}
    </Menu>
  );
};
