import React from 'react';
import { ScrollView } from 'react-native';

import { Layout } from 'components/layout';

interface PlantStepContainerProps {
  children: React.ReactNode;
}

export const PlantStepContainer = ({ children }: PlantStepContainerProps) => (
  <Layout as={ScrollView} style={{ padding: 8 }}>
    {children}
  </Layout>
);
