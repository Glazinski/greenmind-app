import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { replaceLocalhostToIP } from 'api';
import { BackendPlant } from 'schemas/plants';
import { Layout } from 'components/Layout';
import { RootStackScreenProps } from 'navigation/types';

import { PlantDetailsInfoSection } from './PlantDetailsInfoSection';
import { PlantDetailsInfoRow } from './PlantDetailsInfoRow';
import { PlantDetailsInfoMaxMinRow } from './PlantDetailsInfoMaxMinRow';
import { PlantActions } from '../PlantActions';

interface PlantDetailsProps {
  plant: BackendPlant;
}

export const PlantDetails = ({ plant }: PlantDetailsProps) => {
  const navigation =
    useNavigation<RootStackScreenProps<'Plant'>['navigation']>();
  const { t } = useTranslation();
  const {
    image_url,
    name,
    appearance,
    temp_min,
    temp_max,
    soil_humidity_min,
    soil_humidity_max,
    air_humidity_min,
    air_humidity_max,
    light_min,
    light_max,
    fertilizing,
    repotting,
    pruning,
    blooming_time,
    common_diseases,
  } = plant;

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <PlantActions plant={plant}>
          <View style={{ flexDirection: 'row' }}>
            <PlantActions.FavoriteButton />
            <PlantActions.MoreMenu onDeletePress={() => navigation.goBack()} />
          </View>
        </PlantActions>
      ),
    });
  }, [navigation, plant]);

  return (
    <Layout as={ScrollView}>
      <Image
        style={styles.imageContainer}
        source={
          image_url
            ? { uri: replaceLocalhostToIP(image_url) }
            : require('../../../assets/icon.png')
        }
        resizeMode="cover"
      />
      <View style={styles.dataContainer}>
        <PlantDetailsInfoSection title={t('basic_information')} showDivider>
          <PlantDetailsInfoRow label="Name" value={name} />
          <PlantDetailsInfoRow label="Appearance" value={appearance} />
        </PlantDetailsInfoSection>
        <PlantDetailsInfoSection title={t('ideal_conditions')} showDivider>
          <PlantDetailsInfoMaxMinRow
            label="Temperature"
            min={temp_min}
            max={temp_max}
          />
          <PlantDetailsInfoMaxMinRow
            label="Soil humidity"
            min={soil_humidity_min}
            max={soil_humidity_max}
          />
          <PlantDetailsInfoMaxMinRow
            label="Air humidity"
            min={air_humidity_min}
            max={air_humidity_max}
          />
          <PlantDetailsInfoMaxMinRow
            label="Light"
            min={light_min}
            max={light_max}
          />
        </PlantDetailsInfoSection>
        <PlantDetailsInfoSection title={t('other_information')}>
          <PlantDetailsInfoRow label="Fertilizing" value={fertilizing} />
          <PlantDetailsInfoRow label="Repotting" value={repotting} />
          <PlantDetailsInfoRow label="Pruning" value={pruning} />
          <PlantDetailsInfoRow label="Blooming time" value={blooming_time} />
          <PlantDetailsInfoRow
            label="Common diseases"
            value={common_diseases}
          />
        </PlantDetailsInfoSection>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 250,
  },
  dataContainer: {
    marginTop: 4,
  },
});
