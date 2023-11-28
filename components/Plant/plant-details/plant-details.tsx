import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { BackendPlant } from 'schemas/plants';
import { Layout } from 'components/layout';
import { RootStackScreenProps } from 'navigation/types';
import { getImageUrl } from 'services/get-image-url';

import { PlantDetailsInfoSection } from './plant-details-info-section';
import { PlantDetailsInfoRow } from './plant-details-info-row';
import { PlantDetailsInfoMaxMinRow } from './plant-details-info-max-min-row';
import { PlantActions } from '../plant-actions';

interface PlantDetailsProps {
  plant: BackendPlant;
}

export const PlantDetails = ({ plant }: PlantDetailsProps) => {
  const navigation =
    useNavigation<RootStackScreenProps<'Plant'>['navigation']>();
  const { t } = useTranslation();
  const {
    attached_image_url,
    image_url,
    name,
    appearance,
    temp_min,
    temp_max,
    soil_humidity_min,
    soil_humidity_max,
    air_humidity_min,
    air_humidity_max,
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
          <View style={styles.headerRight}>
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
        source={getImageUrl(attached_image_url ?? image_url)}
        resizeMode="cover"
      />
      <View style={styles.dataContainer}>
        <PlantDetailsInfoSection title={t('basic_information')} showDivider>
          <PlantDetailsInfoRow label={t('name')} value={name} />
          <PlantDetailsInfoRow label={t('appearance')} value={appearance} />
        </PlantDetailsInfoSection>
        <PlantDetailsInfoSection title={t('ideal_conditions')} showDivider>
          <PlantDetailsInfoMaxMinRow
            label={t('temperature')}
            min={temp_min}
            max={temp_max}
          />
          <PlantDetailsInfoMaxMinRow
            label={t('soil_humidity')}
            min={soil_humidity_min}
            max={soil_humidity_max}
          />
          <PlantDetailsInfoMaxMinRow
            label={t('air_humidity')}
            min={air_humidity_min}
            max={air_humidity_max}
          />
        </PlantDetailsInfoSection>
        <PlantDetailsInfoSection title={t('other_information')}>
          <PlantDetailsInfoRow label={t('fertilizing')} value={fertilizing} />
          <PlantDetailsInfoRow label={t('repotting')} value={repotting} />
          <PlantDetailsInfoRow label={t('pruning')} value={pruning} />
          <PlantDetailsInfoRow
            label={t('blooming_time')}
            value={blooming_time}
          />
          <PlantDetailsInfoRow
            label={t('common_diseases')}
            value={common_diseases}
          />
        </PlantDetailsInfoSection>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  dataContainer: {
    marginTop: 4,
  },
});
