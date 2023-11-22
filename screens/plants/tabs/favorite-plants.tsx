import { PlantList } from 'components/Plant/plant-list';
import { Layout } from 'components/layout';
import { useFavoritePlants } from 'services/plants/queries';

export const FavoritePlants = () => {
  const {
    data: favoritePlants,
    isLoading,
    isError,
    refetch,
  } = useFavoritePlants();

  return (
    <Layout>
      <PlantList
        plants={favoritePlants}
        isLoading={isLoading}
        isError={isError}
        refetch={refetch}
      />
    </Layout>
  );
};
