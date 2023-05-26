import { View, FlatList, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { usePrivatePlants } from 'services/plants/queries';

import { PlantItem } from './PlantItem';

export const PlantList = () => {
  const { t } = useTranslation();
  const { data: privatePlants, isLoading, isError } = usePrivatePlants();

  if (isLoading) return <ActivityIndicator />;

  if (isError) return <Text>{t('something_went_wrong')}</Text>;

  if (!privatePlants?.length) {
    return (
      <View style={styles.container}>
        <Text>{t('no_plants_found')}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={privatePlants}
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
