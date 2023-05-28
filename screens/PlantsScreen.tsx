import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';
import {
  TabView,
  TabBar,
  SceneMap,
  SceneRendererProps,
} from 'react-native-tab-view';

import { PlantList } from 'components/Plant/PlantList';
import { Layout } from 'components/Layout';
import { MyOwnPlants } from 'components/Plant/MyOwnPlants';
import { CommunityPlants } from 'components/Plant/CommunityPlants';
import { FavoritePlants } from 'components/Plant/FavoritePlants';
import { HomeDrawerScreenProps } from 'navigation/types';
import { usePrivatePlants, usePublicPlants } from 'services/plants/queries';

const renderScene = SceneMap({
  myOwn: MyOwnPlants,
  community: CommunityPlants,
  favorite: FavoritePlants,
});

export const PlantsScreen = ({
  navigation,
}: HomeDrawerScreenProps<'Plants'>) => {
  const {
    colors: { background, primary, onSurfaceVariant },
  } = useTheme();
  const layout = useWindowDimensions();
  const { data: privatePlants, isLoading, isError } = usePrivatePlants();
  const {
    data: publicPlants,
    isLoading: isPublicPlantsLoading,
    isError: isPublicPlantsError,
  } = usePublicPlants();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'myOwn', title: 'My own' },
    { key: 'community', title: 'Community' },
    { key: 'favorite', title: 'Favorite' },
  ]);

  return (
    <Layout>
      <TabView
        style={{ backgroundColor: background }}
        navigationState={{ index, routes }}
        // renderScene={renderScene}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderLabel={({ route, focused }) => (
              <Text
                variant="labelLarge"
                style={{ color: focused ? primary : onSurfaceVariant }}
              >
                {route.title}
              </Text>
            )}
            style={{ backgroundColor: background }}
            indicatorStyle={{ backgroundColor: primary }}
          />
        )}
      />
      {/*<PlantList />*/}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() =>
          navigation.navigate('PlantWizard', {
            screen: 'PlantStep1',
            params: {
              type: 'add',
            },
          })
        }
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    marginRight: 16,
    marginBottom: 40,
    right: 0,
    bottom: 0,
  },
});
