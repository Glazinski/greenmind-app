import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PlantFormStep } from 'components/plant/plant-form/plant-form-step';
import { PlantIdealConditionsForm } from 'components/plant/plant-form/plant-ideal-conditions-form';
import { Layout } from 'components/layout';
import { PlantIdealConditionsInputsSchema } from 'schemas/plants';

export const PlantIdealConditionsScreen = () => {
  const { t } = useTranslation();

  return (
    <Layout as={ScrollView}>
      <PlantFormStep
        index={1}
        title={t('ideal_conditions')}
        schema={PlantIdealConditionsInputsSchema}
        renderFields={(control) => (
          <PlantIdealConditionsForm control={control} />
        )}
      />
    </Layout>
  );
};
