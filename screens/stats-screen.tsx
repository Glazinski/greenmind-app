import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';
import { useTranslation } from 'react-i18next';

import { Layout } from 'components/layout';
import { RootStackScreenProps } from 'navigation/types';
import { useDeviceStats } from 'services/device/queries';
import { FullPageLoadingSpinner } from 'components/ui/full-page-loading-spinner';

const getWeekDays = (lang: string): string[] => {
  const days =
    lang === 'en'
      ? ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      : ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'];
  const today = new Date();
  let weekDays: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - i
    );
    weekDays.push(days[day.getDay()]);
  }

  return weekDays;
};

export const StatsScreen = ({ route }: RootStackScreenProps<'Stats'>) => {
  const { data: deviceStats, isLoading, isError } = useDeviceStats();
  const { t, i18n } = useTranslation();
  const { height } = useWindowDimensions();
  const { typeOfSensor } = route.params;
  const {
    colors: { primary },
  } = useTheme();
  const hasStats = (deviceStats?.length ?? -1) > 0;

  const data = React.useMemo(() => {
    const data = [];
    const totalDays = 7;
    const existingLength = deviceStats?.length ?? 0;
    const sortedDeviceStats = deviceStats?.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      return dateB.getTime() - dateA.getTime();
    });

    for (let i = 0; i < totalDays - existingLength; i++) {
      data.push({
        avg_temp: null,
        avg_air_hum: null,
        date: null,
        avg_soil_hum: null,
        daily_averages_id: null,
        avg_light: null,
      });
    }

    for (let i = 0; i < existingLength; i++) {
      data.push(sortedDeviceStats?.[i]);
    }

    return data.map((dailyAvg, index) => ({
      day: index + 1,
      avg: dailyAvg?.[typeOfSensor],
    }));
  }, [deviceStats, typeOfSensor]);

  const getTypeOfSensorData = React.useCallback(() => {
    switch (typeOfSensor) {
      case 'avg_air_hum':
        return {
          label: t('air_humidity').toLowerCase(),
          tickSuffix: '%',
        };
      case 'avg_soil_hum':
        return {
          label: t('soil_humidity').toLowerCase(),
          tickSuffix: '%',
        };
      case 'avg_temp':
        return {
          label: t('temperature').toLowerCase(),
          tickSuffix: '°C',
        };
      case 'avg_light':
        return {
          label: t('light_intensity').toLowerCase(),
          tickSuffix: '%',
        };
    }
  }, [typeOfSensor]);

  const renderContent = () => {
    if (isLoading) return <FullPageLoadingSpinner />;

    if (isError) {
      return (
        <View style={{ padding: 8 }}>
          <Text variant="titleLarge">{t('stats_error')}</Text>
        </View>
      );
    }

    if (!hasStats) {
      return (
        <View style={{ padding: 8 }}>
          <Text variant="titleLarge">{t('no_stats_found')}</Text>
        </View>
      );
    }

    const { label, tickSuffix } = getTypeOfSensorData();

    return (
      <View style={{ marginLeft: 15 }}>
        <Text variant="titleLarge">
          {t('average_message', {
            label,
          })}
        </Text>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          height={height - 160}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6, 7]}
            tickFormat={getWeekDays(i18n.language)}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(tick) => `${tick}${tickSuffix}`}
          />
          <VictoryBar
            style={{ data: { fill: primary } }}
            data={data}
            x="day"
            y="avg"
          />
        </VictoryChart>
      </View>
    );
  };

  return <Layout>{renderContent()}</Layout>;
};
