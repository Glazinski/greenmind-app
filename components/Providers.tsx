import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { lightTheme } from 'lib/paper/theme';

const queryClient = new QueryClient();

export const Providers = ({ children }: React.PropsWithChildren) => (
  <NavigationContainer>
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={lightTheme}>{children}</PaperProvider>
    </QueryClientProvider>
  </NavigationContainer>
);
