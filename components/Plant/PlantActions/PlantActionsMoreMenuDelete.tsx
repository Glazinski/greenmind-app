import React from 'react';
import { Button, Dialog, Menu, Portal, Text } from 'react-native-paper';

import { useDeletePlant } from 'services/plants/mutations';
import { useTranslation } from 'react-i18next';

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
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <Text>
              {isError
                ? t('something_went_wrong')
                : 'Are you sure you want to proceed?'}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog} disabled={isLoading}>
              Close
            </Button>
            <Button onPress={handleDeletePress} loading={isLoading}>
              {isError ? 'Try again' : 'Delete'}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
};
