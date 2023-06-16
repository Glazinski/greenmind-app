import { PlantList } from 'components/Plant/PlantList';
import { Layout } from 'components/Layout';
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
