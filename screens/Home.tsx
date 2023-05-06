import * as React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import {
  Text,
  Surface,
  Divider,
  useTheme,
  ActivityIndicator,
  IconButton,
  Button,
  Snackbar,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useDeviceLogs, useDeviceTasks } from 'services/device/queries';
import { useDeviceWater } from 'services/device/mutations';
import { useSpinAnimation } from 'hooks/useSpinAnimation';
import { GrowBoxDataRow } from 'components/GrowBoxData/GrowBoxDataRow';
import { GrowBoxDataCell } from 'components/GrowBoxData/GrowBoxDataCell';

export const Home = (): JSX.Element => {
  const [isSnackbarVisible, setIsSnackbarVisible] = React.useState(false);
  const insets = useSafeAreaInsets();
  const {
    colors: { background, tertiary },
  } = useTheme();
  const { data, isLoading, refetch, isRefetching } = useDeviceLogs();
  const { data: tasks } = useDeviceTasks();
  const waterPlant = useDeviceWater();
  const deviceLog = data && data[data.length - 1];
  const spin = useSpinAnimation(isRefetching);

  // React.useEffect(() => {
  //   const device = null;
  //
  //   if (!device) {
  //     console.log('NO DEVICE');
  //     router.push('/device-configuration');
  //   }
  // }, []);

  const onDismissSnackBar = () => setIsSnackbarVisible(false);

  const handleWaterPlantPress = () => {
    if (!tasks) {
      waterPlant.mutate();
      return;
    }

    const hasTaskInQueue = tasks.some(
      ({ task_number, status }) =>
        task_number === 0 && (status === 0 || status === 1)
    );

    if (hasTaskInQueue) {
      setIsSnackbarVisible(true);
    }
  };

  const renderContent = () => {
    if (isLoading) return <ActivityIndicator />;

    if (deviceLog) {
      return (
        <>
          <GrowBoxDataRow>
            <GrowBoxDataCell label="Temperature" value={deviceLog?.temp} />
            <GrowBoxDataCell
              label="Soil humidity"
              value={deviceLog?.soil_hum}
            />
          </GrowBoxDataRow>
          <Divider style={{ marginVertical: 10 }} />
          <GrowBoxDataRow>
            <GrowBoxDataCell label="Air humidity" value={deviceLog?.air_hum} />
            <GrowBoxDataCell label="Light" value={deviceLog?.light} />
          </GrowBoxDataRow>
        </>
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: background, paddingTop: insets.top + 10 },
      ]}
    >
      <Surface style={styles.dataContainer} mode="flat">
        <Text variant="titleLarge" style={styles.dataTitle}>
          GrowBox
        </Text>
        {renderContent()}
        <Animated.View
          style={{
            width: '100%',
            alignItems: 'center',
            transform: [{ rotate: spin }],
          }}
        >
          <IconButton icon="refresh" onPress={() => refetch()} />
        </Animated.View>
      </Surface>
      <View style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
        <Button
          icon="water"
          style={{ backgroundColor: tertiary, width: '40%' }}
          mode="contained"
          onPress={() => handleWaterPlantPress()}
          loading={waterPlant.isLoading}
          disabled={waterPlant.isLoading}
        >
          Water plant
        </Button>
      </View>
      <Snackbar
        visible={isSnackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
        }}
        style={{ width: '100%' }}
      >
        Plant watering is either underway or in the queue
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  dataContainer: {
    padding: 25,
    borderRadius: 15,
  },
  dataTitle: {
    marginBottom: 10,
  },
});
