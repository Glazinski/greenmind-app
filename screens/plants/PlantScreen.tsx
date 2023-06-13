import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { PlantDetails } from 'components/Plant/PlantDetails';
import { Layout } from 'components/Layout';
import { FullPageLoadingSpinner } from 'components/FullPageLoadingSpinner';
import { usePlant } from 'services/plants/queries';
import { RootStackScreenProps } from 'navigation/types';

export const PlantScreen = ({ route }: RootStackScreenProps<'Plant'>) => {
  const { t } = useTranslation();
  const { plantId } = route.params;
  const { data: plant, isLoading, isError } = usePlant(plantId);

  if (isLoading) {
    return <FullPageLoadingSpinner />;
  }

  if (isError) {
    return (
      <Layout>
        <Text>{t('something went wrong')}</Text>
      </Layout>
    );
  }

  return plant && <PlantDetails plant={plant} />;
};
