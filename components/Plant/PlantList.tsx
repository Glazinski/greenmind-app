import { View, FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { BackendPlant } from 'schemas/plants';

import { PlantItem } from './PlantItem';

interface PlantListProps {
  plants: BackendPlant[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export const PlantList = ({ plants, isError, isLoading }: PlantListProps) => {
  const { t } = useTranslation();

  if (isLoading) return <ActivityIndicator />;

  if (isError) return <Text>{t('something_went_wrong')}</Text>;

  if (!plants?.length) {
    return (
      <View style={styles.container}>
        <Text>{t('no_plants_found')}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={plants}
      renderItem={({ item }) => <PlantItem plant={item} />}
      keyExtractor={({ id }) => id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});
