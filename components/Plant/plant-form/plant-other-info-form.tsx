import { View } from 'react-native';
import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { PlantOtherInfoInputs } from 'schemas/plants';
import { TextField } from 'components/ui/text-field';

interface PlantOtherInfoFormProps {
  control: Control<PlantOtherInfoInputs>;
}

export const PlantOtherInfoForm = ({ control }: PlantOtherInfoFormProps) => {
  const { t } = useTranslation();

  return (
    <View>
      <TextField
        mode="outlined"
        label={t('fertilizing') as string}
        name="fertilizing"
        control={control}
      />
      <TextField
        mode="outlined"
        label={t('repotting') as string}
        name="repotting"
        control={control}
      />
      <TextField
        mode="outlined"
        label={t('pruning') as string}
        name="pruning"
        control={control}
      />
      <TextField
        mode="outlined"
        label={t('common_diseases') as string}
        name="common_diseases"
        control={control}
      />
      <TextField
        mode="outlined"
        label={t('blooming_time') as string}
        name="blooming_time"
        control={control}
      />
    </View>
  );
};
