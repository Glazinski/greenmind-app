import React from 'react';
import { List, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Layout } from 'components/Layout';
import { useColorSchemeStore, ColorScheme } from 'store/useColorSchemeStore';

export const SettingsScreen = (): React.JSX.Element => {
  const { t } = useTranslation();
  const { colorScheme, setColorScheme } = useColorSchemeStore();
  const [value, setValue] = React.useState(colorScheme);

  const onValueChange = (newColorScheme: ColorScheme) => {
    setValue(newColorScheme);
    setColorScheme(newColorScheme);
  };

  return (
    <Layout>
      <List.Section title={t('settings') as string}>
        <List.AccordionGroup>
          <List.Accordion
            id="1"
            title={t('theme')}
            left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          >
            <RadioButton.Group
              onValueChange={(value) => onValueChange(value as ColorScheme)}
              value={value}
            >
              <RadioButton.Item
                value="system"
                label={t('use_system_settings')}
              />
              <RadioButton.Item value="light" label={t('light')} />
              <RadioButton.Item value="dark" label={t('dark')} />
            </RadioButton.Group>
          </List.Accordion>
        </List.AccordionGroup>
      </List.Section>
    </Layout>
  );
};
