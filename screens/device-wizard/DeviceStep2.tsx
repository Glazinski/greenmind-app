import { Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { DeviceWizardStackParamList } from 'navigation/DeviceWizardNavigator';
import { Layout } from 'components/Layout';

export const DeviceStep2 = (
  _: NativeStackScreenProps<DeviceWizardStackParamList, 'DeviceStep2'>
) => {
  return (
    <Layout>
      <Text>DeviceStep2</Text>
    </Layout>
  );
};
