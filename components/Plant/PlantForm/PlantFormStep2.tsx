import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Step2FormData } from 'schemas/plants';
import { TextField } from 'components/TextField';

interface PlantFormStep2Props {
  control: Control<Step2FormData>;
}

export const PlantFormStep2 = ({ control }: PlantFormStep2Props) => {
  const { t } = useTranslation();

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
            required
          />
        </View>
        <View style={styles.minMaxField}>
          <TextField
            mode="outlined"
            label="max"
            name={`${fieldName}_max`}
            control={control}
            required
            keyboardType="numeric"
          />
        </View>
      </View>
    </View>
  );

  return (
    <View>
      {renderMinMaxRow(t('temperature'), 'temp')}
      {renderMinMaxRow(t('air_humidity'), 'air_humidity')}
      {renderMinMaxRow(t('soil_humidity'), 'soil_humidity')}
      {renderMinMaxRow(t('light'), 'light')}
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
