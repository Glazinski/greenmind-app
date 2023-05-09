import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';

import { GrowBox } from 'components/GrowBox/GrowBox';

export const Home = (): JSX.Element => {
  const {
    colors: { background },
  } = useTheme();

  // React.useEffect(() => {
  //   const device = null;
  //
  //   if (!device) {
  //     console.log('NO DEVICE');
  //     // router.push('/device-configuration');
  //   }
  // }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, { backgroundColor: background }]}
    >
      <GrowBox />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  dataContainer: {
    padding: 25,
    borderRadius: 15,
  },
  dataTitle: {
    marginBottom: 10,
  },
});
