import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { PlantFormStep } from 'components/plant/plant-form/plant-form-step';
import { PlantFormStep2 } from 'components/plant/plant-form/plant-form-step-2';
import { Layout } from 'components/layout';
import { step2Schema } from 'schemas/plants';

export const PlantStep2Screen = () => {
  const { t } = useTranslation();

  return (
    <Layout as={ScrollView}>
      <PlantFormStep
        index={1}
        title={t('ideal_conditions')}
        schema={step2Schema}
        renderFields={(control) => <PlantFormStep2 control={control} />}
      />
    </Layout>
  );
};
