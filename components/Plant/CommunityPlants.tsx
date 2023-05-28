import { usePublicPlants } from 'services/plants/queries';

import { PlantList } from './PlantList';
import { Layout } from '../Layout';
import { Text } from 'react-native-paper';

export const CommunityPlants = () => {
  const { data: publicPlants, isLoading, isError } = usePublicPlants();

  return (
    <Layout>
      <PlantList
        plants={publicPlants}
        isError={isError}
        isLoading={isLoading}
      />
    </Layout>
  );
};
