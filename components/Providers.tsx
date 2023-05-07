import React from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { lightTheme, darkTheme } from 'lib/paper/theme';

const queryClient = new QueryClient();

export const Providers = ({ children }: React.PropsWithChildren) => {
  const colorScheme = useColorScheme();

  const theme = React.useMemo(
    () => (colorScheme === 'dark' ? darkTheme : lightTheme),
    [colorScheme]
  );

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>{children}</PaperProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
};
