import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { PlantForm } from 'components/PlantForm/PlantForm';
import { usePrivatePlants } from 'services/plants/queries';
import { usePlantFormStore } from 'store/usePlantFormStore';

export const EditPlant = ({
  navigation,
  route,
}: NativeStackScreenProps<any>) => {
  const {
    colors: { background },
  } = useTheme();
  // const { id } = route.params;
  const setSteps = usePlantFormStore((state) => state.setSteps);
  const { data: privatePlants, isLoading } = usePrivatePlants(onSuccess);

  const backendPlant = privatePlants?.find(
    (privatePlant) => privatePlant.id === route.params?.plantId
  );

  function onSuccess() {
    if (backendPlant) {
      const {
        name,
        appearance,
        light_min,
        light_max,
        temp_min,
        temp_max,
        humidity_min,
        humidity_max,
        fertilizing,
        repotting,
        pruning,
        common_diseases,
        blooming_time,
      } = backendPlant;

      setSteps('0', { name, appearance });
      setSteps('1', {
        light_min: light_min.toString(),
        light_max: light_max.toString(),
        temp_min: temp_min.toString(),
        temp_max: temp_max.toString(),
        humidity_min: humidity_min.toString(),
        humidity_max: humidity_max.toString(),
      });
      setSteps('2', {
        fertilizing,
        repotting,
        pruning,
        common_diseases,
        blooming_time,
      });
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {!isLoading && (
          <PlantForm type="edit" plantId={route.params?.plantId} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
