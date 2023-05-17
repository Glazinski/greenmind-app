import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Control } from 'react-hook-form';

import { Step2FormData } from 'schemas/plants';

import { TextField } from '../TextField';

interface PlantFormStep2Props {
  control: Control<Step2FormData>;
}

export const PlantFormStep2 = ({ control }: PlantFormStep2Props) => {
  const renderMinMaxRow = (label: string, fieldName: string) => (
    <View>
      <Text variant="titleMedium">{label}</Text>
      <View style={styles.minMaxFields}>
        <View style={styles.minMaxField}>
          <TextField
            mode="outlined"
            label="min"
            name={`${fieldName}_min`}
            control={control}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.minMaxField}>
          <TextField
            mode="outlined"
            label="max"
            name={`${fieldName}_max`}
            control={control}
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View>
      {renderMinMaxRow('Temperature', 'temp')}
      {renderMinMaxRow('Humidity', 'humidity')}
      {renderMinMaxRow('Light', 'light')}
    </View>
  );
};

const styles = StyleSheet.create({
  minMaxFields: {
    flexDirection: 'row',
    gap: 16,
  },
  minMaxField: {
    flex: 1,
  },
});
