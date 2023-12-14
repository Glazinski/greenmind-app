import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import { usePlantFormStore } from 'store/use-plant-form-store';
import { useWizard } from 'components/wizard-form/use-wizard';

interface PlantStepNavigationProps {
  onPress: () => void;
}

export const PlantStepNavigation = ({ onPress }: PlantStepNavigationProps) => {
  const { activeStep, stepCount } = useWizard();
  const type = usePlantFormStore((state) => state.stepParams.type);

  const getButtonContent = () => {
    if (activeStep === stepCount - 1) {
      return type === 'add' ? <>Add</> : <>Edit</>;
    }

    return <>Go next</>;
  };

  return (
    <View style={styles.buttonsContainer}>
      <Button mode="contained" onPress={onPress} style={styles.button}>
        {getButtonContent()}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  button: {
    flex: 1,
  },
});
