import { StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Surface,
  Text,
  Avatar,
  useTheme,
} from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { usePlantsAssignedToDevice } from 'services/plants/queries';
import { useActivePlantStore } from 'store/useActivePlantStore';

export const GrowBoxAssignedPlant = () => {
  const { t } = useTranslation();
  const {
    colors: { secondary, secondaryContainer, surfaceVariant },
  } = useTheme();
  const plantId = useActivePlantStore((state) => state.plantId);
  const {
    data: assignedPlants,
    isLoading,
    isError,
  } = usePlantsAssignedToDevice();
  const assignedPlant = assignedPlants?.[0];
  const hasAssignedPlant =
    typeof plantId === 'number' && plantId >= 0 && assignedPlant?.name;

  const renderActivePlantName = (): string => {
    return hasAssignedPlant ? assignedPlant.name : 'No plants assigned';
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (isError) {
    return (
      <Surface>
        <Text variant="bodyLarge">{t('something_went_wrong')}</Text>
      </Surface>
    );
  }

  return (
    <Surface
      mode="flat"
      style={[
        styles.container,
        {
          backgroundColor: hasAssignedPlant
            ? secondaryContainer
            : surfaceVariant,
        },
      ]}
    >
      {hasAssignedPlant && assignedPlant?.image_url && (
        <View>
          <Avatar.Image size={60} source={{ uri: assignedPlant?.image_url }} />
        </View>
      )}
      <View>
        <Text style={{ color: secondary }}>Active plant</Text>
        <Text variant="titleMedium">{renderActivePlantName()}</Text>
      </View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    marginTop: 10,
  },
});
