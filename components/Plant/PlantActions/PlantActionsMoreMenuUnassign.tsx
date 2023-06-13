import React from 'react';
import { Menu, Portal, Dialog, Button, Text } from 'react-native-paper';

import { BackendPlant } from 'schemas/plants';
import { useDeletePlant } from 'services/plants/mutations';
import { useTranslation } from 'react-i18next';
import { ConfirmationDialog } from '../../ConfirmationDialog';

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
        leadingIcon="minus"
      />
      <ConfirmationDialog
        visible={visible}
        onDismiss={hideDialog}
        isLoading={isLoading}
        isError={isError}
        onConfirmButtonPress={handleUnassignPress}
        confirmButtonText="Unassign"
      />
    </>
  );
};
