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
import { useTranslation } from 'react-i18next';

import { BackendPlant } from 'schemas/plants';
import { HomeDrawerScreenProps } from 'navigation/types';
import { getImageUrl } from 'services/get-image-url';
import { DEFAULT_IMAGES } from 'constants/default-images';

import { PlantItemDeviceList } from './plant-item-device-list';
import { PlantActions } from '../plant-actions';
import { useDefaultImages } from '../../../hooks/use-default-images';

interface PlantItemProps {
  plant: BackendPlant;
}

export const PlantItem = ({ plant }: PlantItemProps) => {
  const { t } = useTranslation();
  const {
    colors: { secondaryContainer },
  } = useTheme();
  const navigation =
    useNavigation<HomeDrawerScreenProps<'Plants'>['navigation']>();
  const {
    id,
    attached_image_url,
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
    status,
  } = plant;
  const { plantURISource } = useDefaultImages();

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
        <View style={styles.itemContent}>
          <Avatar.Image
            size={83}
            source={getImageUrl(
              attached_image_url ?? image_url,
              plantURISource
            )}
          />
          <View style={styles.itemInformation}>
            <Text variant="titleMedium">{name}</Text>
            {renderMinMaxLabel(t('temperature'), temp_min, temp_max)}
            {renderMinMaxLabel(
              t('soil_humidity'),
              soil_humidity_min,
              soil_humidity_max
            )}
            {renderMinMaxLabel(
              t('air_humidity'),
              air_humidity_min,
              air_humidity_max
            )}
            {renderMinMaxLabel(t('light'), light_min, light_max)}
          </View>
          <PlantActions plant={plant}>
            <View style={styles.itemActions}>
              <PlantActions.MoreMenu />
              <PlantActions.FavoriteButton />
            </View>
          </PlantActions>
        </View>
        {status === 'assigned' && <PlantItemDeviceList plant={plant} />}
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
  },
  itemContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemInformation: {
    marginLeft: 16,
  },
  itemActions: {
    alignSelf: 'flex-start',
    marginLeft: 'auto',
    justifyContent: 'space-between',
  },
  itemDeviceList: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
});
