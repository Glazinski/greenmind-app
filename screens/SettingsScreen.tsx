import React from 'react';
import { List, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Layout } from 'components/Layout';
import { useColorSchemeStore, ColorScheme } from 'store/useColorSchemeStore';

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useColorSchemeStore();
  const [value, setValue] = React.useState(colorScheme);

  const onValueChange = (value: ColorScheme) => {
    setValue(value);
    setColorScheme(value);
  };

  return (
    <Layout>
      <List.Section title="Settings">
        <List.Accordion
          title="Theme"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
        >
          <RadioButton.Group
            onValueChange={(value) => onValueChange(value as ColorScheme)}
            value={value}
          >
            <RadioButton.Item value="system" label={t('use_system_settings')} />
            <RadioButton.Item value="light" label={t('light')} />
            <RadioButton.Item value="dark" label={t('dark')} />
          </RadioButton.Group>
        </List.Accordion>
      </List.Section>
    </Layout>
  );
};
