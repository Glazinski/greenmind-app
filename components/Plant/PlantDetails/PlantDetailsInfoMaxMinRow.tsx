import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface PlantDetailsInfoRowProps {
  label: string;
  min: number;
  max: number;
}

export const PlantDetailsInfoMaxMinRow = ({
  label,
  min,
  max,
}: PlantDetailsInfoRowProps) => {
  const { t } = useTranslation();
  const noDataLabel = t('no_data');
  const renderValue = () => `${min || noDataLabel} - ${max || noDataLabel}`;

  return (
    <View style={styles.container}>
      <Text variant="titleSmall">{label}</Text>
      <Text variant="bodySmall">{renderValue()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
});
