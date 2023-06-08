import React from 'react';
import { IconButton } from 'react-native-paper';

import {
  useAddPlantToFavorite,
  useDeletePlantFromFavorite,
} from 'services/plants/mutations';
import { useFavoritePlants } from 'services/plants/queries';

interface PlantItemFavoriteActionProps {
  plantId: number;
}

export const PlantItemFavoriteAction = ({
  plantId,
}: PlantItemFavoriteActionProps) => {
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
