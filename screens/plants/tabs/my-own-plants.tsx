import { usePrivatePlants } from 'services/plants/queries';

import { PlantList } from 'components/plant/plant-list';
import { Layout } from 'components/layout';

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
