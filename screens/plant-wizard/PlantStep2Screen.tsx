import { PlantFormStep } from 'components/Plant/PlantForm/PlantFormStep';
import { PlantFormStep2 } from 'components/Plant/PlantForm/PlantFormStep2';
import { Layout } from 'components/Layout';
import { step2Schema } from 'schemas/plants';
import { useTranslation } from 'react-i18next';

export const PlantStep2Screen = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <PlantFormStep
        index={1}
        title={t('ideal_conditions')}
        schema={step2Schema}
        renderFields={(control) => <PlantFormStep2 control={control} />}
      />
    </Layout>
  );
};
