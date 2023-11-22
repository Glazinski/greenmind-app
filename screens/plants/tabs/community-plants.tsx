import { usePublicPlants } from 'services/plants/queries';

import { PlantList } from 'components/plant/plant-list';
import { Layout } from 'components/layout';

export const CommunityPlants = () => {
  const { data: publicPlants, isLoading, isError, refetch } = usePublicPlants();

  return (
    <Layout>
      <PlantList
        plants={publicPlants}
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
      />
    </Layout>
  );
};
