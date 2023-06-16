import { usePrivatePlants } from 'services/plants/queries';

import { PlantList } from 'components/Plant/PlantList';
import { Layout } from 'components/Layout';

export const MyOwnPlants = () => {
  const {
    data: privatePlants,
    isLoading,
    isError,
    refetch,
  } = usePrivatePlants();

  return (
    <Layout>
      <PlantList
        plants={privatePlants}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
    </Layout>
  );
};
