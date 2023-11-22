import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { lightTheme, darkTheme } from 'lib/paper/theme';
import { useColorSchemeStore } from '../store/use-color-scheme-store';

const queryClient = new QueryClient();

export const Providers = ({ children }: React.PropsWithChildren) => {
  const userColorScheme = useColorSchemeStore((state) => state.colorScheme);
  const systemColorScheme = useColorScheme();
  const colorScheme =
    userColorScheme === 'system' ? systemColorScheme : userColorScheme;

  const theme = React.useMemo(
    () => (colorScheme === 'dark' ? darkTheme : lightTheme),
    [colorScheme]
  );

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>{children}</PaperProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </NavigationContainer>
  );
};
