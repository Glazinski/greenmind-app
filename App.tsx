import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Providers } from 'components/Providers';
import { useAuth } from 'hooks/useAuth';

import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';

export default function App() {
  const { isSignedIn } = useAuth();

  return (
    <Providers>
      {isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      <StatusBar style="auto" />
    </Providers>
  );
}
