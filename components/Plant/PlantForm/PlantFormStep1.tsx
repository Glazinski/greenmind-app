import { View, StyleSheet } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Checkbox } from 'react-native-paper';

import { Step1FormData } from 'schemas/plants';

import { TextField } from '../../TextField';
import { ImageSelector } from '../../ImageSelector';

interface PlantFormStep1Props {
  control: Control<Step1FormData>;
}

export const PlantFormStep1 = ({ control }: PlantFormStep1Props) => {
  return (
    <View>
      <View style={styles.imageSelector}>
        <Controller
          render={({ field }) => {
            return (
              <ImageSelector onChange={field.onChange} value={field.value} />
            );
          }}
          name="image"
          control={control}
        />
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Checkbox.Item
            label="Toggle to share this item with the community"
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onChange(!value)}
          />
        )}
        name="public"
      />
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

const styles = StyleSheet.create({
  imageSelector: {
    marginBottom: 16,
  },
  checkbox: {
    borderRadius: 12,
  },
});
