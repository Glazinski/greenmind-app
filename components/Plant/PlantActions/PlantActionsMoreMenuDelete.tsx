import React from 'react';
import { Button, Dialog, Menu, Portal, Text } from 'react-native-paper';

import { useDeletePlant } from 'services/plants/mutations';
import { useTranslation } from 'react-i18next';

import { ConfirmationDialog } from 'components/ConfirmationDialog';

interface PlantActionsMoreMenuDeleteProps {
  plantId: number;
  onDismiss: () => void;
  onDeletePress?: () => void;
}

export const PlantActionsMoreMenuDelete = ({
  plantId,
  onDismiss,
  onDeletePress,
}: PlantActionsMoreMenuDeleteProps) => {
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const {
    mutate: deletePlant,
    isLoading,
    isError,
  } = useDeletePlant(handleSuccessfulDelete);

  const showDialog = () => setVisible(true);

  function hideDialog() {
    setVisible(false);
    onDismiss();
  }

  function handleSuccessfulDelete() {
    hideDialog();
    onDeletePress?.();
  }

  const handleDeletePress = async () => {
    await deletePlant(plantId);
  };

  return (
    <>
      <Menu.Item onPress={showDialog} title="Delete" leadingIcon="delete" />
      <ConfirmationDialog
        visible={visible}
        onDismiss={hideDialog}
        isLoading={isLoading}
        isError={isError}
        confirmButtonText="Delete"
        onConfirmButtonPress={handleDeletePress}
      />
    </>
  );
};
