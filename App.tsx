import 'intl-pluralrules';
import 'react-native-gesture-handler';
import './lib/i18n';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Providers } from 'components/Providers';
import { CameraPreviewContainer } from 'components/CameraPreview/CameraPreviewContainer';
import { useAuth } from 'services/auth/useAuth';

import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';

export default function App() {
  const { isSignedIn } = useAuth();

  return (
    <Providers>
      {isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      <CameraPreviewContainer />
      <StatusBar style="auto" />
    </Providers>
  );
}
