import React from 'react';
import { List, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

import { Layout } from 'components/layout';
import { useColorSchemeStore, ColorScheme } from 'store/use-color-scheme-store';
import { useLanguageStore } from 'store/use-language-store';

export const SettingsScreen = (): React.JSX.Element => {
  const { t, i18n } = useTranslation();
  const { colorScheme, setColorScheme } = useColorSchemeStore();
  const { language, setLanguage } = useLanguageStore();
  const [themeValue, setThemeValue] = React.useState(colorScheme);
  const [languageValue, setLanguageValue] = React.useState(language);

  const onThemeValueChange = (newColorScheme: ColorScheme) => {
    setThemeValue(newColorScheme);
    setColorScheme(newColorScheme);
  };

  const onLanguageValueChange = (newLanguage: 'en' | 'pl') => {
    setLanguageValue(newLanguage);
    setLanguage(newLanguage, i18n);
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
              onValueChange={(value) =>
                onThemeValueChange(value as ColorScheme)
              }
              value={themeValue}
            >
              <RadioButton.Item
                value="system"
                label={t('use_system_settings')}
              />
              <RadioButton.Item value="light" label={t('light_theme')} />
              <RadioButton.Item value="dark" label={t('dark')} />
            </RadioButton.Group>
          </List.Accordion>
        </List.AccordionGroup>
        <List.AccordionGroup>
          <List.Accordion
            id="1"
            title={t('language')}
            left={(props) => <List.Icon {...props} icon="earth" />}
          >
            <RadioButton.Group
              onValueChange={(value) => {
                onLanguageValueChange(value as 'en' | 'pl');
              }}
              value={languageValue}
            >
              <RadioButton.Item value="pl" label="Polski" />
              <RadioButton.Item value="en" label="English" />
            </RadioButton.Group>
          </List.Accordion>
        </List.AccordionGroup>
      </List.Section>
    </Layout>
  );
};
