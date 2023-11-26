import 'react-native-gesture-handler';
import './lib/i18n';
import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { Providers } from 'components/providers';
import { FullPageLoadingSpinner } from 'components/ui/full-page-loading-spinner';
import { useAuth } from 'services/auth/use-auth';

import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from './unauthenticated-app';

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
