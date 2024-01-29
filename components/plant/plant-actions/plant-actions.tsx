import React from 'react';

import { BackendPlant } from 'schemas/plants';

import { PlantActionsContext } from './plant-actions-context';
import { PlantActionsFavoriteButton } from './plant-actions-favorite-button';
import { PlantActionsMoreMenu } from './plant-actions-more-menu';

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
