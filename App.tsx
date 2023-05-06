import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { lightTheme } from 'lib/paper/theme';

import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';
import { useAuth } from './hooks/useAuth';

const queryClient = new QueryClient();

export default function App() {
  const { isSignedIn } = useAuth();

  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={lightTheme}>
          {isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
          <StatusBar style="auto" />
        </PaperProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
