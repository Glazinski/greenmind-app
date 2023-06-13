import React from 'react';
import { IconButton } from 'react-native-paper';

import { useFavoritePlants } from 'services/plants/queries';
import {
  useAddPlantToFavorite,
  useDeletePlantFromFavorite,
} from 'services/plants/mutations';

import { usePlantActions } from './PlantActionsContext';

export const PlantActionsFavoriteButton = () => {
  const {
    plant: { id: plantId, status },
  } = usePlantActions();
  const { data: favoritePlants } = useFavoritePlants();
  const { mutate: addPlantToFavorite, isLoading: isAddPlantToFavoriteLoading } =
    useAddPlantToFavorite();
  const {
    mutate: deletePlantFromFavorite,
    isLoading: isDeletePlantFromFavoriteLoading,
  } = useDeletePlantFromFavorite();
  const isFavorite = Boolean(
    favoritePlants?.find((plant) => plant.id === plantId)
  );

  if (status === 'assigned') return null;

  return (
    <IconButton
      icon={isFavorite ? 'star' : 'star-outline'}
      disabled={isAddPlantToFavoriteLoading || isDeletePlantFromFavoriteLoading}
      onPress={async () => {
        if (isFavorite) {
          await deletePlantFromFavorite(plantId);
          return;
        }

        await addPlantToFavorite(plantId);
      }}
    />
  );
};
