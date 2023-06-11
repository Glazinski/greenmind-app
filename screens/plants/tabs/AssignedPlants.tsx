import { PlantList } from 'components/Plant/PlantList';
import { Layout } from 'components/Layout';
import { usePlantsAssignedToDevice } from 'services/plants/queries';

export const AssignedPlants = () => {
  const {
    data: assignedPlants,
    isLoading,
    isError,
  } = usePlantsAssignedToDevice();

  return (
    <Layout>
      <PlantList
        plants={assignedPlants}
        isError={isError}
        isLoading={isLoading}
      />
    </Layout>
  );
};