import { View, StyleSheet } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import { Checkbox } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Step1FormData } from 'schemas/plants';
import { TextField } from 'components/ui/text-field';
import { ImageSelector } from 'components/image-selector';

interface PlantFormStep1Props {
  control: Control<Step1FormData>;
  isAssigned: boolean;
}

export const PlantFormStep1 = ({
  control,
  isAssigned,
}: PlantFormStep1Props) => {
  const { t } = useTranslation();
  return (
    <View>
      <View style={styles.imageSelector}>
        <Controller
          render={({ field }) => (
            <ImageSelector onChange={field.onChange} value={field.value} />
          )}
          name="image"
          control={control}
        />
      </View>
      {!isAssigned && (
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Checkbox.Item
              label={t('community_share_toggle')}
              status={value === 'public' ? 'checked' : 'unchecked'}
              onPress={() =>
                onChange(value === 'public' ? 'private' : 'public')
              }
            />
          )}
          name="status"
        />
      )}
      <TextField
        mode="outlined"
        label={t('name') as string}
        name="name"
        control={control}
        required
      />
      <TextField
        mode="outlined"
        label={t('appearance') as string}
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
