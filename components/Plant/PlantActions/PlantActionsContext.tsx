import React from 'react';

import { BackendPlant } from 'schemas/plants';

interface PlantActionsState {
  plant: BackendPlant;
}

export const PlantActionsContext =
  React.createContext<PlantActionsState | null>(null);

export const usePlantActions = () => {
  const context = React.useContext(PlantActionsContext);

  if (!context) {
    throw new Error(
      'usePlantActions has to be used within <PlantActionsContext.Provider>'
    );
  }

  return context;
};
