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

const getWeekDays = (lang: string) => {
  const days =
    lang === 'en'
      ? ['S', 'M', 'T', 'W', 'T', 'F', 'S']
      : ['N', 'P', 'W', 'Ś', 'C', 'P', 'S'];
  const today = new Date();
  let weekDays = [];

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
  const { t, i18n } = useTranslation();
  const { height } = useWindowDimensions();
  const { typeOfSensor } = route.params;
  const {
    colors: { primary },
  } = useTheme();

  const data = React.useMemo(
    () =>
      dailyAvgs.map((dailyAvg, index) => ({
        day: index + 1,
        avg: dailyAvg[typeOfSensor],
      })),
    [typeOfSensor]
  );

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
          tickSuffix: '',
        };
      case 'avg_temp':
        return {
          label: t('temperature').toLowerCase().slice(0, -3),
          tickSuffix: '°C',
        };
      case 'avg_light':
        return {
          label: t('light_intensity').toLowerCase(),
          tickSuffix: '',
        };
    }
  }, [typeOfSensor]);

  const { label, tickSuffix } = getTypeOfSensorData();

  return (
    <Layout>
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
    </Layout>
  );
};

const dailyAvgs = [
  {
    id: 1,
    avg_light: 230.0,
    device_id: 1,
    avg_air_hum: 48.0,
    avg_temp: 19.5,
    avg_soil_hum: 33.0,
    date: '2023-11-26',
  },
  {
    id: 2,
    avg_light: 300.0,
    device_id: 1,
    avg_air_hum: 55.0,
    avg_temp: 22.5,
    avg_soil_hum: 40.0,
    date: '2023-11-20',
  },
  {
    id: 3,
    avg_light: 320.0,
    device_id: 1,
    avg_air_hum: 57.0,
    avg_temp: 23.0,
    avg_soil_hum: 42.0,
    date: '2023-11-21',
  },
  {
    id: 4,
    avg_light: 280.0,
    device_id: 1,
    avg_air_hum: 53.0,
    avg_temp: 21.0,
    avg_soil_hum: 38.0,
    date: '2023-11-22',
  },
  {
    id: 5,
    avg_light: 350.0,
    device_id: 1,
    avg_air_hum: 60.0,
    avg_temp: 24.0,
    avg_soil_hum: 45.0,
    date: '2023-11-23',
  },
  {
    id: 6,
    avg_light: 250.0,
    device_id: 1,
    avg_air_hum: 50.0,
    avg_temp: 20.0,
    avg_soil_hum: 35.0,
    date: '2023-11-24',
  },
  {
    id: 7,
    avg_light: 370.0,
    device_id: 1,
    avg_air_hum: 63.0,
    avg_temp: 25.0,
    avg_soil_hum: 48.0,
    date: '2023-11-25',
  },
];
