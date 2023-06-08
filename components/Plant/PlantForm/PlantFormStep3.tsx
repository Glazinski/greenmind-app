import { View } from 'react-native';
import { Control } from 'react-hook-form';

import { Step3FormData } from 'schemas/plants';

import { TextField } from '../../TextField';

interface PlantFormStep3Props {
  control: Control<Step3FormData>;
}

export const PlantFormStep3 = ({ control }: PlantFormStep3Props) => {
  return (
    <View>
      <TextField
        mode="outlined"
        label="Fertilizing"
        name="fertilizing"
        control={control}
      />
      <TextField
        mode="outlined"
        label="Repotting"
        name="repotting"
        control={control}
      />
      <TextField
        mode="outlined"
        label="Pruning"
        name="pruning"
        control={control}
      />
      <TextField
        mode="outlined"
        label="Common diseases"
        name="common_diseases"
        control={control}
      />
      <TextField
        mode="outlined"
        label="Blooming time"
        name="blooming_time"
        control={control}
      />
    </View>
  );
};
