import { PlantFormStep } from 'components/PlantForm/PlantFormStep';
import { PlantFormStep2 } from 'components/PlantForm/PlantFormStep2';
import { Layout } from 'components/Layout';
import { step2Schema } from 'schemas/plants';

export const PlantStep2Screen = () => {
  return (
    <Layout>
      <PlantFormStep
        index={1}
        title="Ideal conditions"
        schema={step2Schema}
        renderFields={(control) => <PlantFormStep2 control={control} />}
      />
    </Layout>
  );
};
