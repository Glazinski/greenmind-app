import React from 'react';
import { Menu } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useQueryClient } from '@tanstack/react-query';

import { BackendPlant } from 'schemas/plants';
import { useDeletePlant } from 'services/plants/mutations';
import { ConfirmationDialog } from 'components/ui/confirmation-dialog';

interface PlantActionsMoreMenuUnassignProps {
  plant: BackendPlant;
  onPress?: () => void;
}

export const PlantActionsMoreMenuUnassign = ({
  plant,
  onPress,
}: PlantActionsMoreMenuUnassignProps) => {
  const queryClient = useQueryClient();
  const [visible, setVisible] = React.useState(false);
  const { mutate: deletePlant, isLoading, isError } = useDeletePlant(onSuccess);

  const showDialog = () => setVisible(true);

  async function onSuccess() {
    hideDialog();
    await queryClient.invalidateQueries({
      queryKey: ['devices', plant.device_id, 'plants'],
    });
  }

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
