import { usePublicPlants } from 'services/plants/queries';

import { PlantList } from 'components/Plant/PlantList';
import { Layout } from 'components/Layout';

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
