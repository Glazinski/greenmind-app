import React from 'react';
import { ScrollView } from 'react-native';

import { Layout } from 'components/layout';
import { PlantStepTitle } from './plant-step-title';
import { PlantStepBody } from './plant-step-body';
import { PlantStepNavigation } from './plant-step-navigation';

interface PlantStepContainerProps {
  children: React.ReactNode;
}

export const PlantStep = ({ children }: PlantStepContainerProps) => (
  <Layout as={ScrollView} style={{ padding: 8 }}>
    {children}
  </Layout>
);

PlantStep.Title = PlantStepTitle;
PlantStep.Body = PlantStepBody;
PlantStep.Navigation = PlantStepNavigation;
