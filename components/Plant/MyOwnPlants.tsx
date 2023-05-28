import { usePrivatePlants } from 'services/plants/queries';

import { PlantList } from './PlantList';
import { Layout } from '../Layout';

export const MyOwnPlants = () => {
  console.log('MyOwn');
  const { data: privatePlants, isLoading, isError } = usePrivatePlants();

  return (
    <Layout>
      <PlantList
        plants={privatePlants}
        isLoading={isLoading}
        isError={isError}
      />
    </Layout>
  );
};
