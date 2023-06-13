import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface ConfirmationDialogProps {
  visible: boolean;
  onDismiss: () => void;
  isLoading: boolean;
  isError: boolean;
  onConfirmButtonPress: () => void;
  confirmButtonText: string;
}

export const ConfirmationDialog = ({
  visible,
  onDismiss,
  isLoading,
  isError,
  onConfirmButtonPress,
  confirmButtonText,
}: ConfirmationDialogProps) => {
  const { t } = useTranslation();

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Content>
          <Text>
            {isError ? t('something_went_wrong') : t('proceed_message')}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss} disabled={isLoading}>
            Close
          </Button>
          <Button onPress={onConfirmButtonPress} loading={isLoading}>
            {isError ? t('try_again') : confirmButtonText}
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
