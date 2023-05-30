import { Text } from 'react-native-paper';

import { PlantDetails } from 'components/Plant/PlantDetails';
import { Layout } from 'components/Layout';
import { FullPageLoadingSpinner } from 'components/FullPageLoadingSpinner';
import { usePlant } from 'services/plants/queries';
import { RootStackScreenProps } from 'navigation/types';

export const PlantScreen = ({ route }: RootStackScreenProps<'Plant'>) => {
  const { plantId } = route.params;
  const { data: plant, isLoading, isError } = usePlant(plantId);

  if (isLoading) {
    return <FullPageLoadingSpinner />;
  }

  if (isError) {
    return (
      <Layout>
        <Text>Something went wrong</Text>
      </Layout>
    );
  }

  return plant && <PlantDetails plant={plant} />;
};
