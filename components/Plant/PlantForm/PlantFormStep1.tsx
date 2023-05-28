import { View } from 'react-native';
import { Control } from 'react-hook-form';

import { Step1FormData } from 'schemas/plants';

import { TextField } from '../../TextField';

interface PlantFormStep1Props {
  control: Control<Step1FormData>;
}

export const PlantFormStep1 = ({ control }: PlantFormStep1Props) => {
  return (
    <View>
      <TextField mode="outlined" label="Name" name="name" control={control} />
      <TextField
        mode="outlined"
        label="Appearance"
        name="appearance"
        control={control}
      />
    </View>
  );
};
