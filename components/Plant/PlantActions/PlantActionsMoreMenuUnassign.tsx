import React from 'react';
import { Menu, Portal, Dialog, Button, Text } from 'react-native-paper';

import { BackendPlant } from 'schemas/plants';
import { useDeletePlant } from 'services/plants/mutations';
import { useTranslation } from 'react-i18next';

interface PlantActionsMoreMenuUnassignProps {
  plant: BackendPlant;
  onPress?: () => void;
}

export const PlantActionsMoreMenuUnassign = ({
  plant,
  onPress,
}: PlantActionsMoreMenuUnassignProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const {
    mutate: deletePlant,
    isLoading,
    isError,
  } = useDeletePlant(hideDialog);

  const showDialog = () => setVisible(true);

  function hideDialog() {
    setVisible(false);
    onPress?.();
  }

  const handleUnassignPress = async () => {
    await deletePlant(plant.id);
  };

  return (
    <>
      <Menu.Item
        onPress={showDialog}
        title="Unassign from device"
        leadingIcon="plus"
      />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text>
              {isError
                ? t('something_went_wrong')
                : 'Are you sure you want to proceed? Assigned plant will be deleted entirely'}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} disabled={isLoading}>
              Cancel
            </Button>
            <Button onPress={handleUnassignPress} loading={isLoading}>
              {isError ? 'Try again' : 'Unassign'}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
