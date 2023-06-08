import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Surface, Text, useTheme } from 'react-native-paper';

import { GrowBoxPlantIndicator } from './GrowBoxPlantIndicator';
import { useActivePlantStore } from '../../store/useActivePlantStore';
import { usePlantsAssignedToDevice } from '../../services/plants/queries';
import { useTranslation } from 'react-i18next';

interface GrowBoxPlantSelectorProps {
  style?: object;
}

// const assignedPlants = [
//   { id: 0, name: 'Plant1' },
//   { id: 1, name: 'Plant2' },
//   { id: 2, name: 'Plant3' },
// ];

export const GrowBoxPlantSelector = ({
  style,
}: GrowBoxPlantSelectorProps): JSX.Element => {
  const { t } = useTranslation();
  const {
    colors: { secondary, secondaryContainer },
  } = useTheme();
  const { plantId, setPlantId } = useActivePlantStore();
  const {
    data: assignedPlants,
    isLoading,
    isError,
  } = usePlantsAssignedToDevice();

  const handlePlantPress = (index: number): void => {
    setPlantId(index);
  };

  const renderActivePlantName = (): string => {
    return typeof plantId === 'number' &&
      plantId >= 0 &&
      assignedPlants?.[plantId]?.name
      ? assignedPlants[plantId].name
      : 'No plants assigned';
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
      style={[styles.container, style, { backgroundColor: secondaryContainer }]}
      mode="flat"
    >
      <View style={styles.overviewContainer}>
        <Text variant="bodyLarge">Active plant</Text>
        <Text variant="bodyMedium" style={{ color: secondary }}>
          {renderActivePlantName()}
        </Text>
      </View>
      <View style={styles.plantsContainer}>
        {assignedPlants?.map(({ id }, index) => (
          <GrowBoxPlantIndicator
            key={id}
            isActive={plantId === index}
            onPress={() => handlePlantPress(index)}
            style={index !== assignedPlants.length - 1 ? styles.plantItem : {}}
          />
        ))}
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
  },
  overviewContainer: {
    gap: 5,
  },
  plantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plantItem: {
    marginRight: 8,
  },
});
