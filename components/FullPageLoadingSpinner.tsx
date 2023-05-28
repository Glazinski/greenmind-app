import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { Layout } from './Layout';

export const FullPageLoadingSpinner = () => {
  return (
    <Layout style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </Layout>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
  },
});
