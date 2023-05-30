import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { replaceLocalhostToIP } from 'api';
import { BackendPlant } from 'schemas/plants';
import { Layout } from 'components/Layout';

interface PlantDetailsProps {
  plant: BackendPlant;
}

export const PlantDetails = ({ plant }: PlantDetailsProps) => {
  const { t } = useTranslation();
  const { image_url, name, appearance } = plant;

  return (
    <Layout>
      <Image
        style={styles.imageContainer}
        source={
          image_url
            ? { uri: replaceLocalhostToIP(image_url) }
            : require('../../../assets/icon.png')
        }
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text variant="titleLarge">{t('basic_information')}</Text>
        <View>
          <Text variant="titleSmall">Name</Text>
          <Text variant="bodySmall">{name}</Text>
        </View>
        <View>
          <Text variant="titleSmall">Appearance</Text>
          <Text variant="bodySmall">{appearance}</Text>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    padding: 16,
  },
});
