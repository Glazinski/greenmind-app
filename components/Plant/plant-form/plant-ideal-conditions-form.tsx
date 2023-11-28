import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PlantIdealConditionsInputs } from 'schemas/plants';
import { TextField } from 'components/ui/text-field';

interface PlantIdealConditionsFormProps {
  control: Control<PlantIdealConditionsInputs>;
}

export const PlantIdealConditionsForm = ({
  control,
}: PlantIdealConditionsFormProps) => {
  const { t } = useTranslation();

  const renderMinMaxRow = (
    label: 'temp' | 'air_humidity' | 'soil_humidity',
    fieldName: string
  ) => (
    <View>
      <Text variant="titleMedium">{label}</Text>
      <View style={styles.minMaxFields}>
        <View style={styles.minMaxField}>
          <TextField
            mode="outlined"
            label="min"
            name={`${fieldName}_min` as any}
            control={control}
            keyboardType="numeric"
            required
          />
        </View>
        <View style={styles.minMaxField}>
          <TextField
            mode="outlined"
            label="max"
            name={`${fieldName}_max` as any}
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
