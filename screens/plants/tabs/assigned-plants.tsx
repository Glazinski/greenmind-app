import { PlantList } from 'components/plant/plant-list';
import { Layout } from 'components/layout';
import { useAssignedPlants } from 'services/plants/queries';

export const AssignedPlants = () => {
  const {
    data: assignedPlants,
    isLoading,
    isError,
    refetch,
  } = useAssignedPlants();

  return (
    <Layout>
      <PlantList
        plants={assignedPlants}
        isError={isError}
        isLoading={isLoading}
        refetch={refetch}
      />
    </Layout>
  );
};
