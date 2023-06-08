import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Surface,
  Text,
  TouchableRipple,
  Avatar,
  useTheme,
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { replaceLocalhostToIP } from 'api';
import { BackendPlant } from 'schemas/plants';
import { HomeDrawerScreenProps } from 'navigation/types';

import { PlantItemActions } from './PlantItemActions';

interface PlantItemProps {
  plant: BackendPlant;
}

export const PlantItem = ({ plant }: PlantItemProps) => {
  const {
    colors: { secondaryContainer },
  } = useTheme();
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Plants'>['navigation']>();
  const {
    id,
    image_url,
    name,
    light_min,
    light_max,
    temp_min,
    temp_max,
    soil_humidity_min,
    soil_humidity_max,
    air_humidity_min,
    air_humidity_max,
    user_id,
  } = plant;

  const renderMinMaxLabel = (
    label: string,
    min: string | number,
    max: string | number
  ) => (
    <Text>
      {label}: {min} - {max}
    </Text>
  );

  return (
    <TouchableRipple
      onPress={() =>
        navigation.navigate('Plant', {
          plantId: id,
        })
      }
      style={styles.container}
      borderless={true}
    >
      <Surface style={[styles.item, { backgroundColor: secondaryContainer }]}>
        <Avatar.Image
          size={83}
          source={
            image_url
              ? { uri: replaceLocalhostToIP(image_url) }
              : require('../../../assets/icon.png')
          }
        />
        <View style={styles.itemInformation}>
          <Text variant="titleMedium">{name}</Text>
          {renderMinMaxLabel('Light', light_min, light_max)}
          {renderMinMaxLabel('Temperature', temp_min, temp_max)}
          {renderMinMaxLabel(
            'Soil humidity',
            soil_humidity_min,
            soil_humidity_max
          )}
          {renderMinMaxLabel(
            'Air humidity',
            air_humidity_min,
            air_humidity_max
          )}
        </View>
        <View style={styles.itemActions}>
          <PlantItemActions plant={plant} />
        </View>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    borderRadius: 12,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemInformation: {
    marginLeft: 16,
  },
  itemActions: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    justifyContent: 'space-between',
  },
});
