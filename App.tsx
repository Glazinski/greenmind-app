import 'react-native-gesture-handler';
import './lib/i18n';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Providers } from 'components/Providers';
import { FullPageLoadingSpinner } from 'components/FullPageLoadingSpinner';
import { useAuth } from 'services/auth/useAuth';

import { AuthenticatedApp } from './AuthenticatedApp';
import { UnauthenticatedApp } from './UnauthenticatedApp';

export default function App() {
  const { isSignedIn, isLoading } = useAuth();

  const renderContent = () => {
    if (isLoading) {
      return <FullPageLoadingSpinner />;
    }

    return isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
  };

  return (
    <Providers>
      {renderContent()}
      <StatusBar style="auto" />
    </Providers>
  );
}
