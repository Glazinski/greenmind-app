import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { FAB, Text, useTheme } from 'react-native-paper';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useTranslation } from 'react-i18next';

import { Layout } from 'components/layout';
import { AssignedPlants } from 'screens/plants/tabs/assigned-plants';
import { MyOwnPlants } from 'screens/plants/tabs/my-own-plants';
import { CommunityPlants } from 'screens/plants/tabs/community-plants';
import { FavoritePlants } from 'screens/plants/tabs/favorite-plants';
import { HomeDrawerScreenProps } from 'navigation/types';

const renderScene = SceneMap({
  assigned: AssignedPlants,
  myOwn: MyOwnPlants,
  community: CommunityPlants,
  favorite: FavoritePlants,
});

export const PlantsScreen = ({
  navigation,
  route,
}: HomeDrawerScreenProps<'Plants'>) => {
  const { t } = useTranslation();
  const { params } = route;
  const {
    colors: { background, primary, onSurfaceVariant },
  } = useTheme();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'assigned', title: t('assigned') },
    { key: 'myOwn', title: t('my_own') },
    { key: 'community', title: t('community') },
    { key: 'favorite', title: t('favorite') },
  ]);

  React.useEffect(() => {
    if (typeof params?.tab === 'string') {
      setIndex(routes.findIndex((r) => r.key === params?.tab));
    }
  }, [routes, params?.tab]);

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
