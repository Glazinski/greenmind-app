import React from 'react';

import { BackendPlant } from 'schemas/plants';

import { PlantActionsContext } from './PlantActionsContext';
import { PlantActionsFavoriteButton } from './PlantActionsFavoriteButton';
import { PlantActionsMoreMenu } from './PlantActionsMoreMenu';

interface PlantActionsProps extends React.PropsWithChildren {
  plant: BackendPlant;
}

type PlantActionsComponent = React.FunctionComponent<PlantActionsProps> & {
  FavoriteButton: typeof PlantActionsFavoriteButton;
  MoreMenu: typeof PlantActionsMoreMenu;
};

export const PlantActions: PlantActionsComponent = ({
  plant,
  children,
}: PlantActionsProps) => {
  return (
    <PlantActionsContext.Provider value={{ plant }}>
      {children}
    </PlantActionsContext.Provider>
  );
};

PlantActions.FavoriteButton = PlantActionsFavoriteButton;
PlantActions.MoreMenu = PlantActionsMoreMenu;
