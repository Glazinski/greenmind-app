import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

interface PlantDetailsInfoRowProps {
  label: string;
  value: string | number;
}

export const PlantDetailsInfoRow = ({
  label,
  value,
}: PlantDetailsInfoRowProps) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text variant="titleSmall">{label}</Text>
      <Text variant="bodySmall">{value || t('no_data')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
});
