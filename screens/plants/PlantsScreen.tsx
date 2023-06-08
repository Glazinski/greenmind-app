import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import { Layout } from 'components/Layout';
import { AssignedPlants } from 'screens/plants/tabs/AssignedPlants';
import { MyOwnPlants } from 'screens/plants/tabs/MyOwnPlants';
import { CommunityPlants } from 'screens/plants/tabs/CommunityPlants';
import { FavoritePlants } from 'screens/plants/tabs/FavoritePlants';
import { HomeDrawerScreenProps } from 'navigation/types';

const renderScene = SceneMap({
  assigned: AssignedPlants,
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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'assigned', title: 'Assigned' },
    { key: 'myOwn', title: 'My own' },
    { key: 'community', title: 'Community' },
    { key: 'favorite', title: 'Favorite' },
  ]);

  return (
    <Layout>
      <TabView
        style={{ backgroundColor: background }}
        navigationState={{ index, routes }}
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
    marginBottom: 20,
    right: 0,
    bottom: 0,
  },
});
